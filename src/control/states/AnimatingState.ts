/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import State, { STATE_TYPE } from "~/control/states/State";
import { EVENTS } from "~/const/external";
import { getDirection } from "~/utils";

class AnimatingState extends State {
  public readonly holding = false;
  public readonly animating = true;

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    const holdStartEvent = new ComponentEvent(EVENTS.HOLD_START, { axesEvent });
    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.DRAGGING);
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

    const moveEvent = new ComponentEvent(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta.flick),
      axesEvent
    });

    flicking.trigger(moveEvent);

    if (moveEvent.isCanceled()) {
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
      flicking.viewport.setSize({ height: anchorBelow.panel.height });
    }

    transitTo(STATE_TYPE.IDLE);

    const controller = flicking.control.controller;
    const animatingContext = controller.animatingContext;

    flicking.trigger(new ComponentEvent(EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    }));
  }
}

export default AnimatingState;
