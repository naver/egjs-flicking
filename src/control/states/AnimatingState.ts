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

    const holdStartEvent = new ComponentEvent(EVENTS.HOLD_START, { axesEvent });
    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.DRAGGING);
    }
  }

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta.flick) {
      return;
    }

    const camera = flicking.camera;
    const prevPosition = camera.position;

    void camera.lookAt(axesEvent.pos.flick);

    const moveEvent = new ComponentEvent(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta.flick),
      axesEvent
    });

    flicking.trigger(moveEvent);

    if (moveEvent.isCanceled()) {
      // Return to previous position
      void flicking.camera.lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onFinish(ctx: Parameters<State["onFinish"]>[0]) {
    const { flicking, axesEvent, transitTo } = ctx;

    transitTo(STATE_TYPE.IDLE);

    const controller = flicking.control.controller;
    const animatingContext = controller.animatingContext;

    flicking.trigger(new ComponentEvent(EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent
    }));
  }
}

export default AnimatingState;
