/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import { clamp, getFlickingAttached } from "~/utils";
import * as ERROR from "~/const/error";
import { Panel } from "~/core";

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

  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");

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

    let targetPanel: Panel;

    if (isOverThreshold) {
      if (panelAtPosition.getIndex() !== currentPanel.getIndex()) {
        targetPanel = panelAtPosition;
      } else {
        const adjacentPanel = (position > prevPos) ? currentPanel.next() : currentPanel.prev();
        targetPanel = adjacentPanel || currentPanel;
      }
    } else {
      targetPanel = currentPanel;
    }

    return this.moveToPanel(targetPanel, duration, axesEvent);
  }
}

export default SnapControl;
