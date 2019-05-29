/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Snap from "./Snap";
import { MOVE_TYPE, EVENTS } from "../consts";
import { MoveTypeContext, DestinationInfo } from "../types";
import { circulate, clamp } from "../utils";

class FreeScroll extends Snap {
  protected readonly type: string = MOVE_TYPE.FREE_SCROLL;

  constructor() {
    // Set snap count to Infinity
    super(Infinity);
  }

  public findTargetPanel(ctx: MoveTypeContext): DestinationInfo {
    const { axesEvent, state, viewport } = ctx;
    const destPos = axesEvent.destPos.flick;
    const minimumDistanceToChange = this.calcBrinkOfChange(ctx);
    const scrollArea = viewport.getScrollArea();
    const currentPanel = viewport.getCurrentPanel()!;
    const options = viewport.options;

    const delta = Math.abs(axesEvent.delta.flick + state.delta);
    if (delta > minimumDistanceToChange) {
      const destInfo = super.findSnappedPanel(ctx);

      destInfo.duration = axesEvent.duration;
      destInfo.destPos = destPos;
      destInfo.eventType = !options.circular && destInfo.panel === currentPanel
        ? ""
        : EVENTS.CHANGE;

      return destInfo;
    } else {
      let estimatedPosition = options.circular
        ? circulate(destPos, scrollArea.prev, scrollArea.next, false)
        : destPos;
      estimatedPosition = clamp(estimatedPosition, scrollArea.prev, scrollArea.next);
      estimatedPosition += viewport.getRelativeHangerPosition();

      const estimatedPanel = viewport.findNearestPanelAt(estimatedPosition)!;

      return {
        panel: estimatedPanel,
        destPos,
        duration: axesEvent.duration,
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
      duration: 0,
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
