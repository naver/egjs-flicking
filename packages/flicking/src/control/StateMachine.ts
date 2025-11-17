/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { AxesEvents } from "@egjs/axes";

import Flicking from "../Flicking";
import * as AXES from "../const/axes";

import IdleState from "./states/IdleState";
import HoldingState from "./states/HoldingState";
import DraggingState from "./states/DraggingState";
import AnimatingState from "./states/AnimatingState";
import DisabledState from "./states/DisabledState";
import State, { STATE_TYPE } from "./states/State";

/**
 * @internal
 */
class StateMachine {
  private _state: State;

  public get state(): State { return this._state; }

  public constructor() {
    this._state = new IdleState();
  }

  public fire(eventType: keyof AxesEvents, externalCtx: {
    flicking: Flicking;
    axesEvent: any;
  }) {
    const currentState = this._state;
    const ctx = { ...externalCtx, transitTo: this.transitTo };

    switch (eventType) {
      case AXES.EVENT.HOLD:
        currentState.onHold(ctx);
        break;
      case AXES.EVENT.CHANGE:
        currentState.onChange(ctx);
        break;
      case AXES.EVENT.RELEASE:
        currentState.onRelease(ctx);
        break;
      case AXES.EVENT.ANIMATION_END:
        currentState.onAnimationEnd(ctx);
        break;
      case AXES.EVENT.FINISH:
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

    nextState.onEnter(this._state);

    this._state = nextState;

    return this._state;
  };
}

export default StateMachine;
