/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Panel from "~/core/Panel";
import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import { getFlickingAttached } from "~/utils";
import * as ERROR from "~/const/error";

class SnapControl extends Control {
  public async moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const targetPos = camera.clampToReachablePosition(position);
    const panelAtPosition = flicking.renderer.getPanelFromPosition(targetPos);

    if (!panelAtPosition || !activePanel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const prevPos = activePanel.position;
    const isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;
    const adjacentPanel = (position > prevPos) ? activePanel.next() : activePanel.prev();

    let targetPanel: Panel;

    if (isOverThreshold && panelAtPosition.index !== activePanel.index) {
      targetPanel = panelAtPosition;
    } else if (isOverThreshold && adjacentPanel && adjacentPanel.isReachable()) {
      targetPanel = adjacentPanel;

      // Adjust position to adjacentPanel's position
      const cameraRange = camera.range;
      const cameraRangeSize = cameraRange.max - cameraRange.min;

      if (position > prevPos && adjacentPanel.index < activePanel.index) {
        position = adjacentPanel.position + cameraRangeSize;
      } else if (position < prevPos && adjacentPanel.index > activePanel.index) {
        position = adjacentPanel.position - cameraRangeSize;
      }
    } else {
      targetPanel = activePanel;
    }

    this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

    const panelSnapPosition = targetPanel.getSnapPosition(position);
    const targetPanelPosition = camera.clampToReachablePosition(panelSnapPosition);
    return this._animateToPosition({ position: targetPanelPosition, duration, newActivePanel: targetPanel, axesEvent });
  }
}

export default SnapControl;
