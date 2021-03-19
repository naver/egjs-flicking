/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";

import State, { STATE_TYPE } from "~/control/states/State";
import { EVENTS } from "~/const/external";
import * as AXES from "~/const/axes";
import { getDirection } from "~/utils";

class DraggingState extends State {
  public readonly holding = true;
  public readonly animating = true;

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta[AXES.POSITION_KEY]) {
      return;
    }

    const camera = flicking.camera;
    const prevPosition = camera.position;

    camera.lookAt(axesEvent.pos[AXES.POSITION_KEY]);

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
