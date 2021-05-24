/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State, { STATE_TYPE } from "./State";

/**
 * A state that activates when Flicking is stopped by event's `stop` method
 * @ko 이벤트의 `stop`호출에 의해 Flicking이 정지된 상태
 * @internal
 */
class DisabledState extends State {
  /**
   * Whether user is clicking or touching
   * @ko 현재 사용자가 클릭/터치중인지 여부
   * @type {false}
   * @readonly
   */
  public readonly holding = false;
  /**
   * Whether Flicking's animating
   * @ko 현재 애니메이션 동작 여부
   * @type {true}
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
