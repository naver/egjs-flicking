/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnAnimationEnd, OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";

import Flicking from "../../Flicking";
import { EVENTS } from "../../const/external";
import * as AXES from "../../const/axes";
import { circulatePosition, getDirection } from "../../utils";

export enum STATE_TYPE {
  IDLE,
  HOLDING,
  DRAGGING,
  ANIMATING,
  DISABLED
}

/**
 * A component that shows the current status of the user input or the animation
 * @ko 현재 사용자 입력 또는 애니메이션 상태를 나타내는 컴포넌트
 * @internal
 */
abstract class State {
  /**
   * Whether user is clicking or touching
   * @ko 현재 사용자가 클릭/터치중인지 여부
   * @type {boolean}
   * @readonly
   */
  public abstract readonly holding: boolean;
  /**
   * Whether Flicking's animating
   * @ko 현재 애니메이션 동작 여부
   * @type {boolean}
   * @readonly
   */
  public abstract readonly animating: boolean;

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  public onHold(ctx: {
    flicking: Flicking;
    axesEvent: OnHold;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  public onChange(ctx: {
    flicking: Flicking;
    axesEvent: OnChange;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  public onRelease(ctx: {
    flicking: Flicking;
    axesEvent: OnRelease;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event of Axes
   * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  public onAnimationEnd(ctx: {
    flicking: Flicking;
    axesEvent: OnAnimationEnd;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event
   * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트 핸들러
   * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event of Axes<ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
   * @return {void}
   */
  public onFinish(ctx: {
    flicking: Flicking;
    axesEvent: OnFinish;
    transitTo: (nextState: STATE_TYPE) => State;
  }): void {
    // DO NOTHING
  }

  protected _moveToChangedPosition(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta[AXES.POSITION_KEY]) {
      return;
    }

    const camera = flicking.camera;
    const prevPosition = camera.position;
    const position = axesEvent.pos[AXES.POSITION_KEY];
    const newPosition = flicking.circularEnabled
      ? circulatePosition(position, camera.range.min, camera.range.max)
      : position;

    void camera.lookAt(newPosition);

    const moveEvent = new ComponentEvent(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta[AXES.POSITION_KEY]),
      axesEvent
    });

    flicking.trigger(moveEvent);

    if (moveEvent.isCanceled()) {
      // Return to previous position
      void camera.lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  }
}

export default State;
