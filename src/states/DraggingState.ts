/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import type { OnChange, OnRelease } from "@egjs/axes";
import State from "./State";
import { STATE_TYPE, EVENTS } from "../consts";
import { FlickingContext } from "../types";

class DraggingState extends State {
  public readonly type = STATE_TYPE.DRAGGING;
  public readonly holding = true;
  public readonly playing = true;

  public onChange(e: OnChange, { moveCamera, transitTo }: FlickingContext): void {
    if (!e.delta.flick) {
      return;
    }

    moveCamera(e)
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onRelease(e: OnRelease, context: FlickingContext): void {
    const { flicking, viewport, triggerEvent, transitTo, stopCamera } = context;

    const delta = this.delta;
    const absDelta = Math.abs(delta);
    const options = flicking.options;
    const horizontal = options.horizontal;
    const moveType = viewport.moveType;
    const inputEvent = e.inputEvent;

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

    const swipeDistance = viewport.options.bound
      ? Math.max(absDelta, Math.abs(inputDelta))
      : absDelta;
    const swipeAngle = inputEvent.deltaX
      ? Math.abs(180 * Math.atan(inputEvent.deltaY / inputEvent.deltaX) / Math.PI)
      : 90;
    const belowAngleThreshold = horizontal
      ? swipeAngle <= options.thresholdAngle
      : swipeAngle > options.thresholdAngle;
    const overThreshold = swipeDistance >= options.threshold
      && belowAngleThreshold;

    const moveTypeContext = {
      viewport,
      axesEvent: e,
      state: this,
      swipeDistance,
      isNextDirection,
    };

    // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start
    triggerEvent(EVENTS.HOLD_END, e, true);

    const targetPanel = this.targetPanel;
    if (!overThreshold && targetPanel) {
      // Interrupted while animating
      const interruptDestInfo = moveType.findPanelWhenInterrupted(moveTypeContext);

      viewport.moveTo(
        interruptDestInfo.panel,
        interruptDestInfo.destPos,
        interruptDestInfo.eventType,
        e,
        interruptDestInfo.duration,
      );
      transitTo(STATE_TYPE.ANIMATING);
      return;
    }

    const currentPanel = viewport.getCurrentPanel();
    const nearestPanel = viewport.getNearestPanel();

    if (!currentPanel || !nearestPanel) {
      // There're no panels
      (e as any).stop();
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    const destInfo = overThreshold
      ? moveType.findTargetPanel(moveTypeContext)
      : moveType.findRestorePanel(moveTypeContext);

    viewport.moveTo(
      destInfo.panel,
      destInfo.destPos,
      destInfo.eventType,
      e,
      destInfo.duration,
    ).onSuccess(() => {
      transitTo(STATE_TYPE.ANIMATING);
    }).onStopped(() => {
      transitTo(STATE_TYPE.DISABLED);
      stopCamera(e);
    });
  }
}

export default DraggingState;
