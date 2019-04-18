import State from "./State";
import Panel from "../components/Panel";
import { STATE_TYPE, EVENTS } from "../consts";
import { FlickingContext, MoveTypeObjectOption, MoveTypeSnapOption } from "../types";
import { clamp } from "../utils";
import Viewport from "../components/Viewport";

class DraggingState extends State {
  public readonly type = STATE_TYPE.DRAGGING;
  public readonly holding = true;
  public readonly playing = true;

  public onEnter(prevState: State): void {
    super.onEnter(prevState);
    this.delta = 0;
  }

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
    const defaultDuration = options.duration;
    const halfGap = options.gap / 2;
    const moveType = options.moveType as MoveTypeObjectOption;
    const isFreeScroll = moveType.type === "freeScroll";
    const snapCount = isFreeScroll ? Infinity : (moveType as MoveTypeSnapOption).count;
    const inputEvent = e.inputEvent;
    const eventDelta = Math.abs(e.delta.flick);

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
    this.lastPosition = viewport.getCameraPosition();
    triggerEvent(EVENTS.HOLD_END, e, true);

    if (!overThreshold && this.targetPanel) {
      // Interrupted while animating
      viewport.moveTo(this.targetPanel, "", e, this.targetOffset);
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
    let minimumDistanceToChange = isNextDirection
      ? currentPanel.getSize() - currentPanel.getRelativeAnchorPosition() + halfGap
      : currentPanel.getRelativeAnchorPosition() + halfGap;
    minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);

    let duration = defaultDuration;
    let panelToMove: Panel;
    let offset: number = 0;

    if (overThreshold) {
      if (snapCount > 1 && eventDelta > minimumDistanceToChange) {
        const basePanel = isFreeScroll
          ? nearestPanel
          : viewport.findNearestIdenticalPanel(currentPanel);

        // FreeScroll & snap
        const { panelAtDestPos, snapOffset, indexDiff } = this.findPanelWhenSnapIsOn({
          isNextDirection,
          e,
          viewport,
          basePanel,
        });

        panelToMove = panelAtDestPos;
        offset = snapOffset;
        duration = clamp(e.duration, defaultDuration, defaultDuration * indexDiff);
      } else if (
        !isFreeScroll
        && !viewport.isOutOfBound()
        && (
          swipeDistance <= minimumDistanceToChange
          || (!options.circular && nearestPanel.getIndex() === currentPanel.getIndex())
        )
      ) {
        panelToMove = this.findAdjacentPanel(isNextDirection, viewport);
      } else {
        panelToMove = nearestPanel;
      }
    } else {
      panelToMove = options.circular
        ? this.findRestorePanelInCircularMode(isNextDirection, viewport)
        : currentPanel;
    }

    const panelPosition = panelToMove.getPosition() + offset;
    const movingToSamePanel = panelPosition === currentPanel.getPosition();
    const eventType = (!overThreshold || movingToSamePanel)
      ? isFreeScroll
        ? ""
        : EVENTS.RESTORE
      : EVENTS.CHANGE;

    viewport.moveTo(
      panelToMove,
      eventType,
      e,
      offset,
      duration,
    ).onSuccess(() => {
      transitTo(STATE_TYPE.ANIMATING);
    }).onStopped(() => {
      transitTo(STATE_TYPE.DISABLED);
      stopCamera(e);
    });
  }

  private findRestorePanelInCircularMode(isNextDirection: boolean, viewport: Viewport): Panel {
    const originalPanel = viewport.getCurrentPanel()!.getOriginalPanel();
    const hangerPosition = viewport.getHangerPosition();

    const firstClonedPanel = originalPanel.getIdenticalPanels()[1];
    const lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition)
      > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);

    const panelToMove = (!isNextDirection && lapped)
      ? firstClonedPanel
      : originalPanel;

    return panelToMove;
  }

  private findPanelWhenSnapIsOn(params: {
    isNextDirection: boolean,
    e: any,
    viewport: Viewport,
    basePanel: Panel,
  }): {
    panelAtDestPos: Panel,
    snapOffset: number,
    indexDiff: number,
  } {
    const { isNextDirection, e, viewport, basePanel } = params;

    const options = viewport.options;
    const scrollAreaSize = viewport.getScrollAreaSize();
    const indexRange = viewport.panelManager.getRange();
    const halfGap = options.gap / 2;
    const estimatedHangerPos = e.destPos.flick + viewport.getRelativeHangerPosition();
    const moveType = options.moveType as MoveTypeObjectOption;
    const snapCount = moveType.type === "freeScroll" ? Infinity : moveType.count;
    let panelToMove = basePanel;
    let passedPanelCount = 0;
    let cycleIndex = panelToMove.getIndex() === indexRange.min
      ? basePanel.getCloneIndex() + 1
      : 0;

    while (passedPanelCount < snapCount) {
      const siblingPanel = isNextDirection
        ? panelToMove.nextSibling
        : panelToMove.prevSibling;
      if (!siblingPanel) {
        break;
      }

      const panelIndex = panelToMove.getIndex();
      const siblingIndex = siblingPanel.getIndex();
      if ((isNextDirection && siblingIndex <= panelIndex)
        || (!isNextDirection && siblingIndex >= panelIndex)
      ) {
        cycleIndex = isNextDirection
          ? cycleIndex + 1
          : cycleIndex - 1;
      }
      panelToMove = siblingPanel;
      passedPanelCount += 1;

      // Since panlToMove holds also cloned panels, we should use original panel's position
      const originalPanel = panelToMove.getOriginalPanel();
      const panelPosition = originalPanel.getPosition() + cycleIndex * scrollAreaSize;
      const panelSize = originalPanel.getSize();

      // Current panelToMove contains destPos
      if (
        (isNextDirection && (panelPosition + panelSize + halfGap) > estimatedHangerPos)
        || (!isNextDirection && (panelPosition - halfGap) < estimatedHangerPos)
      ) {
        break;
      }
    }

    const originalPosition = panelToMove.getOriginalPanel().getPosition();
    const offset = cycleIndex * scrollAreaSize - (panelToMove.getPosition() - originalPosition);

    return {
      panelAtDestPos: panelToMove,
      snapOffset: offset,
      indexDiff: passedPanelCount,
    };
  }

  private findAdjacentPanel(isNextDirection: boolean, viewport: Viewport): Panel {
    const options = viewport.options;
    const currentIndex = viewport.getCurrentIndex();
    const currentPanel = viewport.panelManager.get(currentIndex)!;
    const hangerPosition = viewport.getHangerPosition();

    const firstClonedPanel = currentPanel.getIdenticalPanels()[1];
    const lapped = options.circular
      && (Math.abs(currentPanel.getAnchorPosition() - hangerPosition)
        > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition));

    // If lapped in circular mode, use first cloned panel as base panel
    const basePanel = lapped
      ? firstClonedPanel
      : currentPanel;

    const adjacentPanel = isNextDirection
      ? basePanel.nextSibling
      : basePanel.prevSibling;

    const panelToMove = adjacentPanel
      ? adjacentPanel
      : basePanel;

    return panelToMove;
  }
}

export default DraggingState;
