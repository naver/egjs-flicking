import State from "./State";
import { STATE_TYPE, EVENTS, MOVE_TYPE } from "../consts";
import { FlickingContext } from "../types";

class DraggingState extends State {
  public readonly type = STATE_TYPE.DRAGGING;
  public readonly holding = true;
  public readonly playing = true;

  public onChange(e: any, { moveCamera, transitTo }: FlickingContext): void {
    if (!e.delta.flick) {
      return;
    }

    moveCamera(e)
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onRelease(e: any, context: FlickingContext): void {
    const { flicking, viewport, triggerEvent, transitTo, stopCamera } = context;

    const delta = this.delta;
    const options = flicking.options;
    const horizontal = options.horizontal;
    const halfGap = options.gap / 2;
    const moveType = viewport.moveType;
    const isFreeScroll = moveType.is(MOVE_TYPE.FREE_SCROLL);
    const inputEvent = e.inputEvent;

    const velocity = horizontal
      ? inputEvent.velocityX
      : inputEvent.velocityY;
    const inputDelta = horizontal
      ? inputEvent.deltaX
      : inputEvent.deltaY;
    const isNextDirection = Math.abs(velocity) > 1
      ? velocity < 0
      : Math.abs(delta) > 0
        ? delta > 0
        : inputDelta < 0;

    const swipeDistance = Math.max(Math.abs(delta), Math.abs(inputDelta));
    const swipeAngle = inputEvent.deltaX
      ? Math.abs(180 * Math.atan(inputEvent.deltaY / inputEvent.deltaX) / Math.PI)
      : 90;
    const belowAngleThreshold = horizontal
      ? swipeAngle <= options.thresholdAngle
      : swipeAngle > options.thresholdAngle;
    const overThreshold = swipeDistance >= options.threshold
      && belowAngleThreshold;

    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    triggerEvent(EVENTS.HOLD_END, e, true);

    const targetPanel = this.targetPanel;
    if (!overThreshold && targetPanel) {
      // Interrupted while animating
      const destPos = isFreeScroll
        ? e.destPos.flick
        : viewport.findEstimatedPosition(targetPanel);
      viewport.moveTo(targetPanel, destPos, "", e);
      transitTo(STATE_TYPE.ANIMATING);
      return;
    }

    const currentPanel = viewport.getCurrentPanel();
    const nearestPanel = viewport.getNearestPanel();

    if (!currentPanel || !nearestPanel) {
      // There're no panels
      e.stop();
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    // Minimum distance needed to decide prev/next panel as nearest
    /*
     * |  Prev  |     Next     |
     * |--------|--------------|
     * [][      |<-Anchor    ][] <- Panel + Half-Gap
     */
    const currentPanelPosition = currentPanel.getPosition();
    const currentPanelSize = currentPanel.getSize();

    let minimumDistanceToChange: number;
    if (isFreeScroll) {
      // As camera can stop anywhere in free scroll mode,
      // minimumDistanceToChange should be calculated differently.
      // Ref #191(https://github.com/naver/egjs-flicking/issues/191)
      const lastHangerPosition = this.lastPosition + viewport.getRelativeHangerPosition();

      minimumDistanceToChange = isNextDirection
        ? currentPanelPosition + currentPanelSize - lastHangerPosition + halfGap
        : lastHangerPosition - currentPanelPosition + halfGap;
    } else {
      const relativeAnchorPosition = currentPanel.getRelativeAnchorPosition();

      minimumDistanceToChange = isNextDirection
        ? currentPanelSize - relativeAnchorPosition + halfGap
        : relativeAnchorPosition + halfGap;
    }

    minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);

    const moveTypeContext = {
      viewport,
      axesEvent: e,
      minimumDistanceToChange,
      swipeDistance,
      isNextDirection,
    };

    const destInfo = overThreshold
      ? moveType.findTargetPanel(moveTypeContext)
      : moveType.findRestorePanel(moveTypeContext);

    viewport.moveTo(
      destInfo.panel,
      destInfo.destPos,
      destInfo.eventType,
      e,
      destInfo.duration,
    ).onSuccess(() => {
      transitTo(STATE_TYPE.ANIMATING);
    }).onStopped(() => {
      transitTo(STATE_TYPE.DISABLED);
      stopCamera(e);
    });
  }
}

export default DraggingState;
