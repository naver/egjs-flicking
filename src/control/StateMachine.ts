/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { AxesEvents } from "@egjs/axes";

import IdleState from "./states/IdleState";
import HoldingState from "./states/HoldingState";
import DraggingState from "./states/DraggingState";
import AnimatingState from "./states/AnimatingState";
import DisabledState from "./states/DisabledState";

import Flicking from "~/Flicking";
import State from "~/control/states/State";
import { AXES_EVENT } from "~/control/AxesController";

export enum STATE_TYPE {
  IDLE,
  HOLDING,
  DRAGGING,
  ANIMATING,
  DISABLED
}

class StateMachine {
  private _state: State;

  public constructor() {
    this._state = new IdleState();
  }

  public getState(): State {
    return this._state;
  }

  public fire(eventType: keyof AxesEvents, externalCtx: {
    flicking: Flicking;
    axesEvent: any;
  }) {
    const currentState = this._state;
    const ctx = { ...externalCtx, transitTo: this.transitTo };

    switch (eventType) {
      case AXES_EVENT.HOLD:
        currentState.onHold(ctx);
        break;
      case AXES_EVENT.CHANGE:
        currentState.onChange(ctx);
        break;
      case AXES_EVENT.RELEASE:
        currentState.onRelease(ctx);
        break;
      case AXES_EVENT.ANIMATION_END:
        currentState.onAnimationEnd(ctx);
        break;
      case AXES_EVENT.FINISH:
        currentState.onFinish(ctx);
        break;
    }
  }

  public transitTo = (nextStateType: STATE_TYPE): State => {
    let nextState: State;

    switch (nextStateType) {
      case STATE_TYPE.IDLE:
        nextState = new IdleState();
        break;
      case STATE_TYPE.HOLDING:
        nextState = new HoldingState();
        break;
      case STATE_TYPE.DRAGGING:
        nextState = new DraggingState();
        break;
      case STATE_TYPE.ANIMATING:
        nextState = new AnimatingState();
        break;
      case STATE_TYPE.DISABLED:
        nextState = new DisabledState();
        break;
    }

    this._state = nextState;

    return this._state;
  };
}

export default StateMachine;
