/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State from "~/control/states/State";
import { DIRECTION, EVENTS } from "~/const/external";
import { STATE_TYPE } from "~/const/internal";

class IdleState extends State {
  public readonly holding = false;
  public readonly playing = false;

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    // Shouldn't do any action until any panels on flicking area
    const { flicking, axesEvent, transitTo } = ctx;

    if (flicking.getPanelCount() <= 0) {
      transitTo(STATE_TYPE.DISABLED);
      return;
    }

    const eventSuccess = flicking.trigger(EVENTS.HOLD_START, {
      axesEvent
    });

    if (eventSuccess) {
      transitTo(STATE_TYPE.HOLDING);
    } else {
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  // By methods call
  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    const eventSuccess = flicking.trigger(EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: axesEvent.delta.flick > 0 ? DIRECTION.NEXT : DIRECTION.PREV,
      axesEvent
    });

    if (eventSuccess) {
      // Trigger AnimatingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.ANIMATING)
        .onChange(ctx);
    } else {
      transitTo(STATE_TYPE.DISABLED);
    }
  }
}

export default IdleState;
