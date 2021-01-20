/**
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
import * as AXES from "~/const/axes";

export enum STATE_TYPE {
  IDLE,
  HOLDING,
  DRAGGING,
  ANIMATING,
  DISABLED
}

class StateMachine {
  private _flicking: Flicking;
  private _state: State;

  public constructor({ flicking }: { flicking: Flicking }) {
    this._flicking = flicking;
    this._state = new IdleState({ flicking, stateMachine: this });
  }

  public getState(): State {
    return this._state;
  }

  public fire(eventType: keyof AxesEvents, e: any) {
    const currentState = this._state;
    switch (eventType) {
      case AXES.EVENTS.HOLD:
        currentState.onHold(e);
        break;
      case AXES.EVENTS.CHANGE:
        currentState.onChange(e);
        break;
      case AXES.EVENTS.RELEASE:
        currentState.onRelease(e);
        break;
      case AXES.EVENTS.ANIMATION_END:
        currentState.onAnimationEnd(e);
        break;
      case AXES.EVENTS.FINISH:
        currentState.onFinish(e);
        break;
    }
  }

  public transitTo = (nextStateType: STATE_TYPE): State => {
    const flicking = this._flicking;
    const currentState = this._state;

    const stateOption = { flicking, stateMachine: this };

    let nextState: State;

    switch (nextStateType) {
      case STATE_TYPE.IDLE:
        nextState = new IdleState(stateOption);
        break;
      case STATE_TYPE.HOLDING:
        nextState = new HoldingState(stateOption);
        break;
      case STATE_TYPE.DRAGGING:
        nextState = new DraggingState(stateOption);
        break;
      case STATE_TYPE.ANIMATING:
        nextState = new AnimatingState(stateOption);
        break;
      case STATE_TYPE.DISABLED:
        nextState = new DisabledState(stateOption);
        break;
    }

    currentState.onExit(nextState);
    nextState.onEnter(currentState);

    this._state = nextState;

    return this._state;
  };
}

export default StateMachine;
