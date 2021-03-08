/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import FlickingError from "~/core/FlickingError";
import Control from "~/control/Control";
import * as ERROR from "~/const/error";
import { getFlickingAttached } from "~/utils";

class FreeControl extends Control {
  public async moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");

    const camera = flicking.camera;
    const targetPos = camera.clampToReachablePosition(position);

    const anchorAtPosition = camera.findAnchorIncludePosition(targetPos);
    const activePanel = this._activePanel;

    if (!anchorAtPosition) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    const targetPanel = anchorAtPosition.panel;
    if (targetPanel !== activePanel) {
      this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
    }

    return this._animateToPosition({ position, duration, newActivePanel: targetPanel, axesEvent });
  }
}

export default FreeControl;
