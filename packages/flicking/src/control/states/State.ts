/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OnAnimationEnd, OnChange, OnFinish, OnHold, OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";
import * as AXES from "../../constants/internal";
import Panel from "../../core/panel/Panel";
import { EVENTS } from "../../event/names";
import Flicking from "../../Flicking";
import { circulatePosition, getDirection } from "../../utils";

export enum STATE_TYPE {
  IDLE,
  HOLDING,
  DRAGGING,
  ANIMATING,
  DISABLED
}

/**
 * Event context for State event handlers
 * @internal
 */
export interface StateContext<T> {
  /** An instance of Flicking */
  flicking: Flicking;
  /** An Axes event */
  axesEvent: T;
  /** A function for changing current state to other state */
  transitTo: (nextState: STATE_TYPE) => State;
}

/**
 * A component that shows the current status of the user input or the animation
 * @internal
 */
abstract class State {
  /**
   * Whether user is clicking or touching
   * @readonly
   */
  public abstract readonly holding: boolean;
  /**
   * Whether Flicking's animating
   * @readonly
   */
  public abstract readonly animating: boolean;

  protected _delta: number = 0;
  protected _targetPanel: Panel | null = null;

  /**
   * A sum of delta values of change events from the last hold event of Axes
   * @readonly
   */
  public get delta(): number {
    return this._delta;
  }

  /**
   * A panel to set as {@link Control.activePanel} after the animation is finished
   * @readonly
   */
  public get targetPanel(): Panel | null {
    return this._targetPanel;
  }

  public set targetPanel(val: Panel | null) {
    this._targetPanel = val;
  }

  /**
   * An callback which is called when state has changed to this state
   * @param prevState - An previous state
   */
  public onEnter(prevState: State): void {
    this._delta = prevState._delta;
    this._targetPanel = prevState._targetPanel;
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-hold | hold} event
   * @param ctx - {@link StateContext}
   */
  public onHold(ctx: StateContext<OnHold>): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-change | change} event
   * @param ctx - {@link StateContext}
   */
  public onChange(ctx: StateContext<OnChange>): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-release | release} event
   * @param ctx - {@link StateContext}
   */
  public onRelease(ctx: StateContext<OnRelease>): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-animationEnd | animationEnd} event
   * @param ctx - {@link StateContext}
   */
  public onAnimationEnd(ctx: StateContext<OnAnimationEnd>): void {
    // DO NOTHING
  }

  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-finish | finish} event
   * @param ctx - {@link StateContext}
   */
  public onFinish(ctx: StateContext<OnFinish>): void {
    // DO NOTHING
  }

  /**
   * @internal
   */
  protected _moveToChangedPosition(ctx: StateContext<OnChange>): void {
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
