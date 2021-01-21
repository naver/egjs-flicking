/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnChange, OnRelease } from "@egjs/axes";

import { STATE_TYPE } from "~/control/StateMachine";
import State from "~/control/states/State";
import { DIRECTION, EVENTS } from "~/const/external";

class DraggingState extends State {
  public readonly holding = true;
  public readonly playing = true;

  private _dragDelta = 0;

  public onChange(e: OnChange): void {
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    if (!e.delta.flick) {
      return;
    }

    const camera = flicking.getCamera();
    const prevPosition = camera.getPosition();

    camera.lookAt(e.pos.flick);

    this._dragDelta += e.delta.flick;

    const isSuccess = flicking.trigger(EVENTS.MOVE, {
      isTrusted: e.isTrusted,
      holding: this.holding,
      direction: e.delta.flick > 0 ? DIRECTION.NEXT : DIRECTION.PREV,
      axesEvent: e
    });

    if (!isSuccess) {
      // Return to previous position
      flicking.getCamera().lookAt(prevPosition);
      stateMachine.transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onRelease(e: OnRelease): void {
    const flicking = this._flicking;
    const stateMachine = this._stateMachine;

    const delta = this._dragDelta;
    const absDelta = Math.abs(delta);

    const horizontal = flicking.isHorizontal();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const inputEvent = e.inputEvent as { velocityX: number; velocityY: number; deltaX: number; deltaY: number };

    const velocity = horizontal
      ? inputEvent.velocityX
      : inputEvent.velocityY;
    const inputDelta = horizontal
      ? inputEvent.deltaX
      : inputEvent.deltaY;
    const isNextDirection = Math.abs(velocity) > 1
      ? velocity < 0
      : absDelta > 0
        ? delta > 0
        : inputDelta < 0;

    const overThreshold = absDelta >= flicking.getThreshold();

    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    flicking.trigger(EVENTS.HOLD_END, {
      axesEvent: e
    });

    if (flicking.getRenderer().getPanelCount() <= 0) {
      // There're no panels
      stateMachine.transitTo(STATE_TYPE.IDLE);
      return;
    }

    if (!overThreshold) {
      // FIXME:
    }

    const control = flicking.getControl();

    stateMachine.transitTo(STATE_TYPE.ANIMATING);
    void control.moveToPosition(e.destPos.flick, flicking.getDuration(), true);
  }
}

export default DraggingState;
