/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnAnimationEnd, OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";

import StateMachine from "~/control/StateMachine";
import Flicking from "~/Flicking";

abstract class State {
  protected _flicking: Flicking;
  protected _stateMachine: StateMachine;

  public abstract readonly holding: boolean;
  public abstract readonly playing: boolean;

  public constructor({ flicking, stateMachine }: { flicking: Flicking; stateMachine: StateMachine }) {
    this._flicking = flicking;
    this._stateMachine = stateMachine;
  }

  public onHold(e: OnHold): void {
    // DO NOTHING
  }

  public onChange(e: OnChange): void {
    // DO NOTHING
  }

  public onRelease(e: OnRelease): void {
    // DO NOTHING
  }

  public onAnimationEnd(e: OnAnimationEnd): void {
    // DO NOTHING
  }

  public onFinish(e: OnFinish): void {
    // DO NOTHING
  }
}

export default State;
