/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import { clamp, getFlickingAttached } from "~/utils";
import * as ERROR from "~/const/error";
import { Panel } from "~/core";

export interface SnapControlOptions {
  count: number;
}

class SnapControl extends Control {
  // Options
  private _count: SnapControlOptions["count"];

  public constructor({
    count = 1
  }: Partial<SnapControlOptions>) {
    super();

    this._count = count;
  }

  public get count() { return this._count; }
  public set count(val: SnapControlOptions["count"]) { this._count = val; }

  public moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const cameraRange = camera.range;
    const clampedPos = clamp(position, cameraRange.min, cameraRange.max);
    const panelAtPosition = flicking.renderer.getPanelFromPosition(clampedPos);

    if (!panelAtPosition || !activePanel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const prevPos = activePanel.position;
    const isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;

    let targetPanel: Panel;

    if (isOverThreshold) {
      if (panelAtPosition.index !== activePanel.index) {
        targetPanel = panelAtPosition;
      } else {
        const adjacentPanel = (position > prevPos) ? activePanel.next() : activePanel.prev();
        targetPanel = adjacentPanel || activePanel;
      }
    } else {
      targetPanel = activePanel;
    }

    return this.moveToPanel(targetPanel, duration, axesEvent);
  }
}

export default SnapControl;
