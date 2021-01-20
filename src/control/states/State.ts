/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import StateMachine from "~/control/StateMachine";
import Flicking from "~/Flicking";
import Panel from "~/core/Panel";
import { DIRECTION } from "~/const/external";
import { ValueOf } from "~/type/internal";

abstract class State {
  protected _flicking: Flicking;
  protected _stateMachine: StateMachine;
  protected _delta: number;
  protected _direction: ValueOf<typeof DIRECTION> | null;
  protected _targetPanel: Panel | null;
  protected _lastPosition: number;

  public abstract readonly holding: boolean;
  public abstract readonly playing: boolean;

  public constructor({ flicking, stateMachine }: { flicking: Flicking; stateMachine: StateMachine }) {
    this._flicking = flicking;
    this._stateMachine = stateMachine;

    this._delta = 0;
    this._direction = null;
    this._targetPanel = null;
    this._lastPosition = 0;
  }

  public onEnter(prevState: State): void {
    this._delta = prevState._delta;
    this._direction = prevState._direction;
    this._targetPanel = prevState._targetPanel;
    this._lastPosition = prevState._lastPosition;
  }

  public onExit(nextState: State): void {
    // DO NOTHING
  }

  public onHold(e: any): void {
    // DO NOTHING
  }

  public onChange(e: any): void {
    // DO NOTHING
  }

  public onRelease(e: any): void {
    // DO NOTHING
  }

  public onAnimationEnd(e: any): void {
    // DO NOTHING
  }

  public onFinish(e: any): void {
    // DO NOTHING
  }
}

export default State;
