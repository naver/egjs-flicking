/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";
import * as AXES from "../../constants/internal";
import { EVENTS } from "../../event/names";

import State, { STATE_TYPE } from "./State";

/**
 * A state that activates when user's dragging the Flicking area
 * @internal
 */
class DraggingState extends State {
  /**
   * Whether user is clicking or touching
   * @readonly
   */
  public readonly holding = true;
  /**
   * Whether Flicking's animating
   * @readonly
   */
  public readonly animating = true;

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    this._moveToChangedPosition(ctx);
  }

  public onRelease(ctx: Parameters<State["onRelease"]>[0]) {
    const { flicking, axesEvent, transitTo } = ctx;

    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    flicking.trigger(
      new ComponentEvent(EVENTS.HOLD_END, {
        axesEvent
      })
    );

    if (flicking.renderer.panelCount <= 0) {
      // There're no panels
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    transitTo(STATE_TYPE.ANIMATING);

    const control = flicking.control;
    const position = axesEvent.destPos[AXES.POSITION_KEY];
    const duration = Math.max(axesEvent.duration, flicking.duration);

    try {
      void control.moveToPosition(position, duration, axesEvent);
    } catch (_err) {
      transitTo(STATE_TYPE.IDLE);
      axesEvent.setTo({ [AXES.POSITION_KEY]: flicking.camera.position }, 0);
    }
  }
}

export default DraggingState;
