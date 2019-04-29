import Snap from "./Snap";
import { MOVE_TYPE, EVENTS } from "../consts";
import { MoveTypeContext, DestinationInfo } from "../types";
import { circulate } from "../utils";

class FreeScroll extends Snap {
  protected readonly type: string = MOVE_TYPE.FREE_SCROLL;

  constructor() {
    // Set snap count to Infinity
    super(Infinity);
  }

  public findTargetPanel(ctx: MoveTypeContext): DestinationInfo {
    const { axesEvent, viewport, swipeDistance, minimumDistanceToChange } = ctx;
    const destPos = axesEvent.destPos.flick;

    const eventDelta = Math.abs(axesEvent.delta.flick);
    if (eventDelta > minimumDistanceToChange) {
      const destInfo = super.findSnappedPanel(ctx);
      destInfo.destPos = destPos;
      destInfo.eventType = destInfo.eventType === EVENTS.RESTORE
        ? ""
        : EVENTS.CHANGE;

      return destInfo;
    } else {
      const scrollArea = viewport.getScrollArea();
      const estimatedPosition = circulate(destPos, scrollArea.prev, scrollArea.next, false)
        + viewport.getRelativeHangerPosition();

      return {
        panel: viewport.findNearestPanelAt(estimatedPosition)!,
        destPos,
        duration: viewport.options.duration,
        eventType: swipeDistance > minimumDistanceToChange
          ? EVENTS.CHANGE
          : "",
      };
    }
  }

  public findRestorePanel(ctx: MoveTypeContext): DestinationInfo {
    return this.findTargetPanel(ctx);
  }
}

export default FreeScroll;
