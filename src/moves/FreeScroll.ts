/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Snap from "./Snap";
import { MOVE_TYPE, EVENTS } from "../consts";
import { MoveTypeContext, DestinationInfo } from "../types";
import { circulate, isBetween } from "../utils";

class FreeScroll extends Snap {
  protected readonly type: string = MOVE_TYPE.FREE_SCROLL;

  constructor() {
    // Set snap count to Infinity
    super(Infinity);
  }

  public findTargetPanel(ctx: MoveTypeContext): DestinationInfo {
    const { axesEvent, state, viewport, isNextDirection } = ctx;
    const destPos = axesEvent.destPos.flick;
    const minimumDistanceToChange = this.calcBrinkOfChange(ctx);
    const scrollArea = viewport.getScrollArea();
    const scrollAreaSize = viewport.getScrollAreaSize();
    const currentPanel = viewport.getCurrentPanel()!;
    const options = viewport.options;
    const looped = !isBetween(state.lastPosition + state.delta, scrollArea.prev, scrollArea.next);

    // Sometimes, delta has wrong value
    // https://github.com/naver/egjs-axes/issues/136
    const origDestPos = axesEvent.destPos.flick;
    const eventDestPos = looped
      ? isNextDirection
        // Adjust value for circular mode, only for when looped
        ? origDestPos + scrollAreaSize
        : origDestPos - scrollAreaSize
      : origDestPos;
    const eventDelta = Math.abs(eventDestPos - state.lastPosition);

    if (eventDelta > minimumDistanceToChange) {
      const destInfo = super.findSnappedPanel(ctx);
      destInfo.destPos = destPos;
      destInfo.eventType = !options.circular && destInfo.panel === currentPanel
        ? ""
        : EVENTS.CHANGE;

      return destInfo;
    } else {
      const estimatedPosition = circulate(destPos, scrollArea.prev, scrollArea.next, false)
        + viewport.getRelativeHangerPosition();
      const estimatedPanel = viewport.findNearestPanelAt(estimatedPosition)!;

      return {
        panel: estimatedPanel,
        destPos,
        duration: viewport.options.duration,
        eventType: "",
      };
    }
  }

  public findRestorePanel(ctx: MoveTypeContext): DestinationInfo {
    return this.findTargetPanel(ctx);
  }

  public findPanelWhenInterrupted(ctx: MoveTypeContext): DestinationInfo {
    const { viewport } = ctx;

    return {
      panel: viewport.getNearestPanel()!,
      destPos: viewport.getCameraPosition(),
      duration: viewport.options.duration,
      eventType: "",
    };
  }

  protected calcBrinkOfChange(ctx: MoveTypeContext): number {
    const { viewport, isNextDirection } = ctx;

    const options = viewport.options;
    const currentPanel = viewport.getCurrentPanel()!;
    const halfGap = options.gap / 2;

    const lastPosition = viewport.stateMachine.getState().lastPosition;
    const currentPanelPosition = currentPanel.getPosition();

    // As camera can stop anywhere in free scroll mode,
    // minimumDistanceToChange should be calculated differently.
    // Ref #191(https://github.com/naver/egjs-flicking/issues/191)
    const lastHangerPosition = lastPosition + viewport.getRelativeHangerPosition();

    const scrollAreaSize = viewport.getScrollAreaSize();
    let minimumDistanceToChange = isNextDirection
      ? currentPanelPosition + currentPanel.getSize() - lastHangerPosition + halfGap
      : lastHangerPosition - currentPanelPosition + halfGap;
    minimumDistanceToChange = Math.abs(minimumDistanceToChange % scrollAreaSize);

    return Math.min(minimumDistanceToChange, scrollAreaSize - minimumDistanceToChange);
  }
}

export default FreeScroll;
