/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import State from "~/control/states/State";
import { DIRECTION, EVENTS } from "~/const/external";
import { STATE_TYPE } from "~/const/internal";

class DraggingState extends State {
  public readonly holding = true;
  public readonly playing = true;

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    if (!axesEvent.delta.flick) {
      return;
    }

    const camera = flicking.getCamera();
    const prevPosition = camera.getPosition();

    camera.lookAt(axesEvent.pos.flick);

    const isSuccess = flicking.trigger(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: axesEvent.delta.flick > 0 ? DIRECTION.NEXT : DIRECTION.PREV,
      axesEvent
    });

    if (!isSuccess) {
      // Return to previous position
      flicking.getCamera().lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onRelease(ctx: Parameters<State["onRelease"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    flicking.trigger(EVENTS.HOLD_END, {
      axesEvent
    });

    if (flicking.getRenderer().getPanelCount() <= 0) {
      // There're no panels
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    const control = flicking.getControl();
    const controller = control.getController()!;

    transitTo(STATE_TYPE.ANIMATING);

    controller.setReleaseContext(axesEvent);
    control.moveToPosition(axesEvent.destPos.flick, Math.max(axesEvent.duration, flicking.getDuration()));
    controller.setReleaseContext(null);
  }
}

export default DraggingState;
