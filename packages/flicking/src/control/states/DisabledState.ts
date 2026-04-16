/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State, { STATE_TYPE } from "./State";

/**
 * A state that activates when Flicking is stopped by event's `stop` method
 * @internal
 */
class DisabledState extends State {
  /**
   * Whether user is clicking or touching
   * @readonly
   */
  public readonly holding = false;
  /**
   * Whether Flicking's animating
   * @readonly
   */
  public readonly animating = true;

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
