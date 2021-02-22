/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State, { STATE_TYPE } from "~/control/states/State";
import { EVENTS } from "~/const/external";
import { getDirection } from "~/utils";

class AnimatingState extends State {
  public readonly holding = false;
  public readonly animating = true;

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    const isSuccess = flicking.trigger(EVENTS.HOLD_START, {
      axesEvent
    });

    if (isSuccess) {
      transitTo(STATE_TYPE.DRAGGING);
    } else {
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta.flick) {
      return;
    }

    const camera = flicking.camera;
    const prevPosition = camera.position;

    camera.lookAt(axesEvent.pos.flick);

    const isSuccess = flicking.trigger(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta.flick),
      axesEvent
    });

    if (!isSuccess) {
      // Return to previous position
      flicking.camera.lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onFinish(ctx: Parameters<State["onFinish"]>[0]) {
    const { flicking, axesEvent, transitTo } = ctx;

    // if (viewport.options.bound) {
    //   viewport.setCurrentPanel(this.targetPanel as Panel);
    // } else {
    //   viewport.setCurrentPanel(viewport.getNearestPanel() as Panel);
    // }

    const camera = flicking.camera;
    const anchorBelow = camera.findAnchorIncludePosition(camera.position);
    if (flicking.horizontal && flicking.adaptive && anchorBelow) {
      flicking.viewport.setSize({ height: anchorBelow.panel.bbox.height });
    }

    transitTo(STATE_TYPE.IDLE);

    const controller = flicking.control.controller;
    const animatingContext = controller.animatingContext;

    flicking.trigger(EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    });
  }
}

export default AnimatingState;
