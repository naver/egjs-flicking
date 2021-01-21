/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnChange, OnHold } from "@egjs/axes";

import { STATE_TYPE } from "~/control/StateMachine";
import State from "~/control/states/State";
import { DIRECTION, EVENTS } from "~/const/external";

class IdleState extends State {
  public readonly holding = false;
  public readonly playing = false;

  public onHold(e: OnHold): void {
    // Shouldn't do any action until any panels on flicking area
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    if (flicking.getPanelCount() <= 0) {
      stateMachine.transitTo(STATE_TYPE.DISABLED);
      return;
    }

    const eventSuccess = flicking.trigger(EVENTS.HOLD_START, {
      axesEvent: e
    });

    if (eventSuccess) {
      stateMachine.transitTo(STATE_TYPE.HOLDING);
    } else {
      stateMachine.transitTo(STATE_TYPE.DISABLED);
    }
  }

  // By methods call
  public onChange(e: OnChange): void {
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    const eventSuccess = flicking.trigger(EVENTS.MOVE_START, {
      isTrusted: e.isTrusted,
      holding: this.holding,
      direction: e.delta.flick > 0 ? DIRECTION.NEXT : DIRECTION.PREV,
      axesEvent: e
    });

    if (eventSuccess) {
      // Trigger AnimatingState's onChange, to trigger "move" event immediately
      stateMachine.transitTo(STATE_TYPE.ANIMATING)
        .onChange(e);
    } else {
      stateMachine.transitTo(STATE_TYPE.DISABLED);
    }
  }
}

export default IdleState;
