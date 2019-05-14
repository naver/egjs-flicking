/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import State from "../states/State";
import { AxesEventType, ValueOf, FlickingContext, StateType } from "../types";
import { AXES_EVENTS, STATE_TYPE } from "../consts";
import IdleState from "../states/IdleState";
import HoldingState from "../states/HoldingState";
import DraggingState from "../states/DraggingState";
import AnimatingState from "../states/AnimatingState";
import DisabledState from "../states/DisabledState";

class StateMachine {
  private state: State = new IdleState();

  public fire(eventType: ValueOf<AxesEventType>, e: any, context: FlickingContext) {
    const currentState = this.state;
    switch (eventType) {
      case AXES_EVENTS.HOLD:
        currentState.onHold(e, context);
        break;
      case AXES_EVENTS.CHANGE:
        currentState.onChange(e, context);
        break;
      case AXES_EVENTS.RELEASE:
        currentState.onRelease(e, context);
        break;
      case AXES_EVENTS.ANIMATION_END:
        currentState.onAnimationEnd(e, context);
        break;
      case AXES_EVENTS.FINISH:
        currentState.onFinish(e, context);
        break;
    }
  }

  public getState(): State {
    return this.state;
  }

  public transitTo = (nextStateType: ValueOf<StateType>): State => {
    const currentState = this.state;

    if (currentState.type !== nextStateType) {
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

      currentState.onExit(nextState!);
      nextState!.onEnter(currentState);

      this.state = nextState!;
    }
    return this.state;
  }
}

export default StateMachine;
