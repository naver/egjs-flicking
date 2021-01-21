/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnChange, OnFinish, OnHold } from "@egjs/axes";

import { STATE_TYPE } from "~/control/StateMachine";
import State from "~/control/states/State";
import { DIRECTION, EVENTS } from "~/const/external";

class AnimatingState extends State {
  public readonly holding = false;
  public readonly playing = true;

  public onHold(e: OnHold): void {
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    const isSuccess = flicking.trigger(EVENTS.HOLD_START, {
      axesEvent: e
    });

    if (isSuccess) {
      stateMachine.transitTo(STATE_TYPE.DRAGGING);
    } else {
      stateMachine.transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onChange(e: OnChange): void {
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    if (!e.delta.flick) {
      return;
    }

    const camera = flicking.getCamera();
    const prevPosition = camera.getPosition();

    camera.lookAt(e.pos.flick);

    const isSuccess = flicking.trigger(EVENTS.MOVE, {
      isTrusted: e.isTrusted,
      holding: this.holding,
      direction: e.delta.flick > 0 ? DIRECTION.NEXT : DIRECTION.PREV,
      axesEvent: e
    });

    if (!isSuccess) {
      // Return to previous position
      flicking.getCamera().lookAt(prevPosition);
      stateMachine.transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onFinish(e: OnFinish) {
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    // if (viewport.options.bound) {
    //   viewport.setCurrentPanel(this.targetPanel as Panel);
    // } else {
    //   viewport.setCurrentPanel(viewport.getNearestPanel() as Panel);
    // }

    // if (flicking.options.adaptive) {
    //   viewport.updateAdaptiveSize();
    // }

    stateMachine.transitTo(STATE_TYPE.IDLE);

    // Assure camera's at correct position

    flicking.trigger(EVENTS.MOVE_END, {
      isTrusted: e.isTrusted,
      holding: this.holding,
      direction: "NEXT", // FIXME:
      axesEvent: e
    });
  }
}

export default AnimatingState;
