/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Panel from "~/core/Panel";
import State from "~/control/states/State";
import { DIRECTION, EVENTS } from "~/const/external";
import { STATE_TYPE } from "~/const/internal";

class HoldingState extends State {
  public readonly holding = true;
  public readonly playing = true;

  private _releaseEvent: OnRelease | null = null;

  public onChange(ctx: Parameters<State["onChange"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    const inputEvent = axesEvent.inputEvent as { offsetX: number; offsetY: number };

    const offset = flicking.options.horizontal
      ? inputEvent.offsetX
      : inputEvent.offsetY;

    const eventSuccess = flicking.trigger(EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: offset < 0 ? DIRECTION.NEXT : DIRECTION.PREV,
      axesEvent
    });

    if (eventSuccess) {
      // Trigger DraggingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.DRAGGING)
        .onChange(ctx);
    } else {
      transitTo(STATE_TYPE.DISABLED);
    }
  }

  public onRelease(ctx: Parameters<State["onRelease"]>[0]): void {
    const { flicking, axesEvent, transitTo } = ctx;

    flicking.trigger(EVENTS.HOLD_END, {
      axesEvent
    });

    if (axesEvent.delta.flick !== 0) {
      // Sometimes "release" event on axes triggered before "change" event
      // Especially if user flicked panel fast in really short amount of time
      // if delta is not zero, that means above case happened.

      // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
      // At least one move event should be included between holdStart and holdEnd
      axesEvent.setTo({ flick: flicking.getCamera().getPosition() }, 0);
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    // Can't handle select event here,
    // As "finish" axes event happens
    this._releaseEvent = axesEvent;
  }

  public onFinish(ctx: Parameters<State["onFinish"]>[0]): void {
    const { flicking, transitTo } = ctx;

    // Should transite to IDLE state before select event
    // As user expects hold is already finished
    transitTo(STATE_TYPE.IDLE);

    if (!this._releaseEvent) {
      return;
    }

    // Handle release event here
    // To prevent finish event called twice
    const releaseEvent = this._releaseEvent;

    // Static click
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const srcEvent = releaseEvent.inputEvent.srcEvent;

    let clickedElement: HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (srcEvent.type === "touchend") {
      const touchEvent = srcEvent as TouchEvent;
      const touch = touchEvent.changedTouches[0];
      clickedElement = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      clickedElement = srcEvent.target;
    }

    const panels = flicking.getRenderer().getPanels();
    let clickedPanel: Panel | null = null;

    for (const panel of panels) {
      if (panel.getElement().contains(clickedElement)) {
        clickedPanel = panel;
        break;
      }
    }

    if (clickedPanel) {
      const cameraPosition = flicking.getCamera().getPosition();
      const clickedPanelPosition = clickedPanel.getPosition();
      const direction = clickedPanelPosition > cameraPosition
        ? DIRECTION.NEXT
        : clickedPanelPosition < cameraPosition
          ? DIRECTION.PREV
          : null;

      flicking.trigger(EVENTS.SELECT, {
        index: clickedPanel.getIndex(),
        panel: clickedPanel,
        direction // Direction to the clicked panel
      });
    }
  }
}

export default HoldingState;
