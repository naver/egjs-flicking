/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import { EVENTS } from "../../const/external";
import { getDirection } from "../../utils";

import State, { STATE_TYPE } from "./State";

/**
 * A state that activates when Flicking's animating by user input or method call
 * @ko 사용자 입력이나 메소드 호출에 의해 Flicking의 애니메이션이 동작중인 상태
 * @internal
 */
class AnimatingState extends State {
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

  public onHold(ctx: Parameters<State["onHold"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;
    const targetPanel = this._targetPanel;
    const control = flicking.control;

    this._delta = 0;
    flicking.control.updateInput();

    if (flicking.changeOnHold && targetPanel) {
      control.setActive(targetPanel, control.activePanel, axesEvent.isTrusted);
    }

    const holdStartEvent = new ComponentEvent(EVENTS.HOLD_START, { axesEvent });
    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.DRAGGING);
    }
  }

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    this._moveToChangedPosition(ctx);
  }

  public onFinish(ctx: Parameters<State["onFinish"]>[0]) {
    const { flicking, axesEvent, transitTo } = ctx;

    const control = flicking.control;
    const controller = control.controller;
    const animatingContext = controller.animatingContext;

    transitTo(STATE_TYPE.IDLE);

    flicking.trigger(new ComponentEvent(EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    }));

    const targetPanel = this._targetPanel;
    if (targetPanel) {
      control.setActive(targetPanel, control.activePanel, axesEvent.isTrusted);
    }
  }
}

export default AnimatingState;
