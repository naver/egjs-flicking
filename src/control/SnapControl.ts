/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import { getFlickingAttached } from "~/utils";
import * as ERROR from "~/const/error";
import { Panel } from "~/core";

class SnapControl extends Control {
  public async moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const clampedPosition = camera.clampToReachablePosition(position);
    const anchorAtPosition = camera.findNearestAnchor(clampedPosition);

    if (!anchorAtPosition || !activePanel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const prevPos = activePanel.position;

    const isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;
    const adjacentAnchor = (position > prevPos)
      ? camera.getNextAnchor(anchorAtPosition)
      : camera.getPrevAnchor(anchorAtPosition);

    let targetPos: number;
    let targetPanel: Panel;

    if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
      // Move to anchor at position
      targetPanel = anchorAtPosition.panel;
      targetPos = anchorAtPosition.position;
    } else if (isOverThreshold && adjacentAnchor) {
      // Move to adjacent anchor
      targetPanel = adjacentAnchor.panel;
      targetPos = adjacentAnchor.position;
    } else {
      // Restore to active panel
      targetPos = activePanel.position;
      targetPanel = activePanel;
    }

    this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

    return this._animateToPosition({
      position: targetPos,
      duration,
      newActivePanel: targetPanel,
      axesEvent
    });
  }
}

export default SnapControl;
