/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnChange, OnRelease } from "@egjs/axes";

import { STATE_TYPE } from "~/control/StateMachine";
import State from "~/control/states/State";

class DisabledState extends State {
  public readonly type = STATE_TYPE.DISABLED;
  public readonly holding = false;
  public readonly playing = true;

  public onAnimationEnd(): void {
    this._stateMachine.transitTo(STATE_TYPE.IDLE);
  }

  public onChange(e: OnChange): void {
    // Can stop Axes's change event
    e.stop();

    this._stateMachine.transitTo(STATE_TYPE.IDLE);
  }

  public onRelease(e: OnRelease): void {
    // This is needed when stopped hold start event
    if (e.delta.flick === 0) {
      this._stateMachine.transitTo(STATE_TYPE.IDLE);
    }
  }
}

export default DisabledState;
