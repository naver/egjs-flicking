/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnAnimationEnd, OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";

import Flicking from "~/Flicking";

export enum STATE_TYPE {
  IDLE,
  HOLDING,
  DRAGGING,
  ANIMATING,
  DISABLED
}

abstract class State {
  public abstract readonly holding: boolean;
  public abstract readonly animating: boolean;

  public onHold(ctx: {
    flicking: Flicking;
    axesEvent: OnHold;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  public onChange(ctx: {
    flicking: Flicking;
    axesEvent: OnChange;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  public onRelease(ctx: {
    flicking: Flicking;
    axesEvent: OnRelease;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  public onAnimationEnd(ctx: {
    flicking: Flicking;
    axesEvent: OnAnimationEnd;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  public onFinish(ctx: {
    flicking: Flicking;
    axesEvent: OnFinish;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }
}

export default State;
