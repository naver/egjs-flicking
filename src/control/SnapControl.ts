/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import { clamp } from "~/utils";
import * as ERROR from "~/const/error";

export interface SnapControlOption {
  count: number;
}

class SnapControl extends Control {
  // Options
  protected _count: number;

  public constructor({
    count = 1
  }: SnapControlOption) {
    super();

    this._count = count;
  }

  public moveToPosition(position: number, duration: number) {
    const flicking = this._flicking;

    if (!flicking) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    const renderer = flicking.getRenderer();
    const camera = flicking.getCamera();

    const currentPanel = renderer.getPanel(this._activeIndex);

    const cameraRange = camera.getRange();
    const clampedPos = clamp(position, cameraRange.min, cameraRange.max);
    const panelAtPosition = flicking.getRenderer().getPanelFromPosition(clampedPos);

    if (!panelAtPosition || !currentPanel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const prevPos = currentPanel.getPosition();
    const isOverThreshold = Math.abs(position - prevPos) >= flicking.getThreshold();

    if (isOverThreshold) {
      if (panelAtPosition.getIndex() !== currentPanel.getIndex()) {
        return this.moveToPanel(panelAtPosition, duration);
      } else {
        const adjacentPanel = (position > prevPos) ? currentPanel.next() : currentPanel.prev();
        return this.moveToPanel(adjacentPanel || currentPanel, duration);
      }
    } else {
      return this.moveToPanel(currentPanel, duration);
    }
  }
}

export default SnapControl;
