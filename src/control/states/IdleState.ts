/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import { EVENTS } from "../../const/external";
import { getDirection } from "../../utils";

import State, { STATE_TYPE } from "./State";

/**
 * A default state when there's no user input and no animation's playing
 * @ko 사용자의 입력이 없고, 애니메이션이 동작하고있지 않은 기본 상태
 * @internal
 */
class IdleState extends State {
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
   * @type {false}
   * @readonly
   */
  public readonly animating = false;

  public onEnter() {
    this._delta = 0;
    this._targetPanel = null;
  }

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    // Shouldn't do any action until any panels on flicking area
    const { flicking, axesEvent, transitTo } = ctx;

    if (flicking.renderer.panelCount <= 0) {
      transitTo(STATE_TYPE.DISABLED);
      return;
    }

    const holdStartEvent = new ComponentEvent(EVENTS.HOLD_START, {
      axesEvent
    });

    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.HOLDING);
    }
  }

  // By methods call
  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;
    const controller = flicking.control.controller;
    const animatingContext = controller.animatingContext;

    const moveStartEvent = new ComponentEvent(EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    });
    flicking.trigger(moveStartEvent);

    if (moveStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      // Trigger AnimatingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.ANIMATING).onChange(ctx);
    }
  }
}

export default IdleState;
