/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Panel from "../components/Panel";
import { ValueOf, Direction, StateType, FlickingContext } from "../types";

abstract class State {
  public delta: number = 0;
  public direction: ValueOf<Direction> | null = null;
  public targetPanel: Panel | null = null;
  public lastPosition: number = 0;
  public abstract readonly type: ValueOf<StateType>;
  public abstract readonly holding: boolean;
  public abstract readonly playing: boolean;

  public onEnter(prevState: State): void {
    this.delta = prevState.delta;
    this.direction = prevState.direction;
    this.targetPanel = prevState.targetPanel;
    this.lastPosition = prevState.lastPosition;
  }

  public onExit(nextState: State): void {
    // DO NOTHING
  }

  public onHold(e: any, context: FlickingContext): void {
    // DO NOTHING
  }

  public onChange(e: any, context: FlickingContext): void {
    // DO NOTHING
  }

  public onRelease(e: any, context: FlickingContext): void {
    // DO NOTHING
  }

  public onAnimationEnd(e: any, context: FlickingContext): void {
    // DO NOTHING
  }

  public onFinish(e: any, context: FlickingContext): void {
    // DO NOTHING
  }
}

export default State;
