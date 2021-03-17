/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import type { OnChange, OnFinish, OnHold } from "@egjs/axes";
import State from "./State";
import { STATE_TYPE, EVENTS } from "../consts";
import { FlickingContext } from "../types";
import { circulate } from "../utils";

class AnimatingState extends State {
  public readonly type = STATE_TYPE.ANIMATING;
  public readonly holding = false;
  public readonly playing = true;

  public onHold(e: OnHold, { viewport, triggerEvent, transitTo }: FlickingContext): void {
    const options = viewport.options;
    const scrollArea = viewport.getScrollArea();
    const scrollAreaSize = viewport.getScrollAreaSize();
    const loopCount = Math.floor((this.lastPosition + this.delta - scrollArea.prev) / scrollAreaSize);

    const targetPanel = this.targetPanel;
    if (options.circular && loopCount !== 0 && targetPanel) {
      const cloneCount = viewport.panelManager.getCloneCount();
      const originalTargetPosition = targetPanel.getPosition();

      // cloneIndex is from -1 to cloneCount - 1
      const newCloneIndex = circulate(targetPanel.getCloneIndex() - loopCount, -1, cloneCount - 1, true);
      const newTargetPosition = originalTargetPosition - loopCount * scrollAreaSize;
      const newTargetPanel = targetPanel.getIdenticalPanels()[newCloneIndex + 1].clone(newCloneIndex, true);

      // Set new target panel considering looped count
      newTargetPanel.setPosition(newTargetPosition);
      this.targetPanel = newTargetPanel;
    }

    // Reset last position and delta
    this.delta = 0;
    this.lastPosition = viewport.getCameraPosition();

    // Update current panel as current nearest panel
    viewport.setCurrentPanel(viewport.getNearestPanel()!);
    triggerEvent(EVENTS.HOLD_START, e, true)
      .onSuccess(() => {
        transitTo(STATE_TYPE.DRAGGING);
      })
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onChange(e: OnChange, { moveCamera, transitTo }: FlickingContext): void {
    if (!e.delta.flick) {
      return;
    }

    moveCamera(e)
      .onStopped(() => {
        transitTo(STATE_TYPE.DISABLED);
      });
  }

  public onFinish(e: OnFinish, { flicking, viewport, triggerEvent, transitTo }: FlickingContext) {
    const isTrusted = e && e.isTrusted;

    viewport.options.bound
      ? viewport.setCurrentPanel(this.targetPanel!)
      : viewport.setCurrentPanel(viewport.getNearestPanel()!);

    if (flicking.options.adaptive) {
      viewport.updateAdaptiveSize();
    }

    transitTo(STATE_TYPE.IDLE);
    viewport.updateCameraPosition();
    triggerEvent(EVENTS.MOVE_END, e, isTrusted, {
      direction: this.direction,
    });
  }
}

export default AnimatingState;
