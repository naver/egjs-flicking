/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnAnimationEnd, OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";

import Flicking from "../../Flicking";
import Panel from "../../core/panel/Panel";
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

  protected _delta: number = 0;
  protected _targetPanel: Panel | null = null;

  /**
   * A sum of delta values of change events from the last hold event of Axes
   * @ko 이전 hold이벤트부터 change에 의해 발생한 이동 delta값의 합산
   * @type {number}
   * @readonly
   */
  public get delta() { return this._delta; }

  /**
   * A panel to set as {@link Control#activePanel} after the animation is finished
   * @ko 애니메이션 종료시 {@link Control#activePanel}로 설정할 패널
   * @type {number}
   * @readonly
   */
  public get targetPanel() { return this._targetPanel; }

  public set targetPanel(val: Panel | null) { this._targetPanel = val; }

  /**
   * An callback which is called when state has changed to this state
   * @ko 현재 상태로 돌입했을때 호출되는 콜백 함수
   * @param {State} prevState An previous state<ko>이전 상태값</ko>
   * @return {void}
   */
  public onEnter(prevState: State): void {
    this._delta = prevState._delta;
    this._targetPanel = prevState._targetPanel;
  }

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
    const delta = axesEvent.delta[AXES.POSITION_KEY];

    if (!delta) {
      return;
    }

    this._delta += delta;

    const camera = flicking.camera;
    const prevPosition = camera.position;
    const position = axesEvent.pos[AXES.POSITION_KEY];
    const newPosition = flicking.circularEnabled
      ? circulatePosition(position, camera.range.min, camera.range.max)
      : position;

    camera.lookAt(newPosition);

    const moveEvent = new ComponentEvent(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta[AXES.POSITION_KEY]),
      axesEvent
    });

    flicking.trigger(moveEvent);

    if (moveEvent.isCanceled()) {
      // Return to previous position
      camera.lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  }
}

export default State;
