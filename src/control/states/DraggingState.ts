/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import { EVENTS } from "../../const/external";
import * as AXES from "../../const/axes";
import { getDirection } from "../../utils";

import State, { STATE_TYPE } from "./State";

/**
 * A state that activates when user's dragging the Flicking area
 * @ko 사용자가 드래깅중인 상태
 * @internal
 */
class DraggingState extends State {
  /**
   * Whether user is clicking or touching
   * @ko 현재 사용자가 클릭/터치중인지 여부
   * @type {true}
   * @readonly
   */
  public readonly holding = true;
  /**
   * Whether Flicking's animating
   * @ko 현재 애니메이션 동작 여부
   * @type {true}
   * @readonly
   */
  public readonly animating = true;

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta[AXES.POSITION_KEY]) {
      return;
    }

    const camera = flicking.camera;
    const prevPosition = camera.position;

    void camera.lookAt(axesEvent.pos[AXES.POSITION_KEY]);

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

  public onRelease(ctx: Parameters<State["onRelease"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    flicking.trigger(new ComponentEvent(EVENTS.HOLD_END, {
      axesEvent
    }));

    if (flicking.renderer.panelCount <= 0) {
      // There're no panels
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    transitTo(STATE_TYPE.ANIMATING);

    const control = flicking.control;
    const position = axesEvent.destPos[AXES.POSITION_KEY];
    const duration = Math.max(axesEvent.duration, flicking.duration);

    void control.moveToPosition(position, duration, axesEvent);
  }
}

export default DraggingState;
