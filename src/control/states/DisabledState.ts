/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State from "~/control/states/State";
import { STATE_TYPE } from "~/control/StateMachine";

class DisabledState extends State {
  public readonly holding = false;
  public readonly playing = true;

  public onAnimationEnd(ctx: Parameters<State["onAnimationEnd"]>[0]): void {
    const { transitTo } = ctx;

    transitTo(STATE_TYPE.IDLE);
  }

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { axesEvent, transitTo } = ctx;

    // Can stop Axes's change event
    axesEvent.stop();

    transitTo(STATE_TYPE.IDLE);
  }

  public onRelease(ctx: Parameters<State["onRelease"]>[0]): void {
    const { axesEvent, transitTo } = ctx;

    // This is needed when stopped hold start event
    if (axesEvent.delta.flick === 0) {
      transitTo(STATE_TYPE.IDLE);
    }
  }
}

export default DisabledState;
