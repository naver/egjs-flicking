/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import State, { STATE_TYPE } from "~/control/states/State";
import { EVENTS } from "~/const/external";
import { getDirection } from "~/utils";

class IdleState extends State {
  public readonly holding = false;
  public readonly animating = false;

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    // Shouldn't do any action until any panels on flicking area
    const { flicking, axesEvent, transitTo } = ctx;

    if (flicking.renderer.panelCount <= 0) {
      transitTo(STATE_TYPE.DISABLED);
      return;
    }

    const holdStartEvent = new ComponentEvent(EVENTS.HOLD_START, {
      axesEvent
    });

    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.HOLDING);
    }
  }

  // By methods call
  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;
    const controller = flicking.control.controller;
    const animatingContext = controller.animatingContext;

    const moveStartEvent = new ComponentEvent(EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    });
    flicking.trigger(moveStartEvent);

    if (moveStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      // Trigger AnimatingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.ANIMATING).onChange(ctx);
    }
  }
}

export default IdleState;
