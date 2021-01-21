/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import { clamp } from "~/utils";
import * as ERROR from "~/const/error";
import { DIRECTION, EVENTS } from "~/const/external";

export interface SnapControlOption {
  count: number;
}

class SnapControl extends Control {
  // Options
  protected _count: number;

  public constructor(options: SnapControlOption) {
    super();

    const { count = 1 } = options;

    this._count = count;
  }

  public moveToPosition(position: number, duration: number, force: boolean = false) {
    const flicking = this._flicking;

    if (!flicking) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    const camera = flicking.getCamera();
    const cameraRange = camera.getRange();

    const clampedPos = clamp(position, cameraRange.min, cameraRange.max);
    const panel = flicking.getRenderer().getPanelFromPosition(clampedPos);
    console.log("moving to", panel);

    if (!panel) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    return this.moveToPanel(panel, duration, force);
  }
}

export default SnapControl;
