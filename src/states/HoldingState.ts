/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import type { OnChange, OnRelease, OnFinish } from "@egjs/axes";
import State from "./State";
import { STATE_TYPE, EVENTS, DIRECTION } from "../consts";
import { FlickingContext, SelectEvent } from "../types";

class HoldingState extends State {
  public readonly type = STATE_TYPE.HOLDING;
  public readonly holding = true;
  public readonly playing = true;

  private releaseEvent: any = null;

  public onChange(e: OnChange, context: FlickingContext): void {
    const { flicking, triggerEvent, transitTo } = context;

    const offset = flicking.options.horizontal
      ? e.inputEvent.offsetX
      : e.inputEvent.offsetY;
    this.direction = offset < 0
      ? DIRECTION.NEXT
      : DIRECTION.PREV;

    triggerEvent(EVENTS.MOVE_START, e, true)
      .onSuccess(() => {
        // Trigger DraggingState's onChange, to trigger "move" event immediately
        transitTo(STATE_TYPE.DRAGGING)
          .onChange(e, context);
      })
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onRelease(e: OnRelease, context: FlickingContext): void {
    const { viewport, triggerEvent, transitTo } = context;

    triggerEvent(EVENTS.HOLD_END, e, true);

    if (e.delta.flick !== 0) {
      // Sometimes "release" event on axes triggered before "change" event
      // Especially if user flicked panel fast in really short amount of time
      // if delta is not zero, that means above case happened.

      // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
      // At least one move event should be included between holdStart and holdEnd
      e.setTo({ flick: viewport.getCameraPosition() }, 0);
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    if (!e.inputEvent.srcEvent.cancelable) {
      // Released by scrolling
      return;
    }

    // Can't handle select event here,
    // As "finish" axes event happens
    this.releaseEvent = e;
  }

  public onFinish(e: OnFinish, { viewport, triggerEvent, transitTo }: FlickingContext): void {
    // Should transite to IDLE state before select event
    // As user expects hold is already finished
    transitTo(STATE_TYPE.IDLE);

    if (!this.releaseEvent) {
      return;
    }

    // Handle release event here
    // To prevent finish event called twice
    const releaseEvent = this.releaseEvent;

    // Static click
    const srcEvent = releaseEvent.inputEvent.srcEvent;

    let clickedElement: HTMLElement;
    if (srcEvent.type === "touchend") {
      const touchEvent = srcEvent as TouchEvent;
      const touch = touchEvent.changedTouches[0];
      clickedElement = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    } else {
      clickedElement = srcEvent.target;
    }
    const clickedPanel = viewport.panelManager.findPanelOf(clickedElement);
    const cameraPosition = viewport.getCameraPosition();

    if (clickedPanel) {
      const clickedPanelPosition = clickedPanel.getPosition();
      const direction = clickedPanelPosition > cameraPosition
        ? DIRECTION.NEXT
        : clickedPanelPosition < cameraPosition
          ? DIRECTION.PREV
          : null;

      // Don't provide axes event, to use axes instance instead
      triggerEvent<SelectEvent>(EVENTS.SELECT, releaseEvent, true, {
        direction, // Direction to the clicked panel
        index: clickedPanel.getIndex(),
        panel: clickedPanel,
        element: clickedElement,
      });
    }
  }
}

export default HoldingState;
