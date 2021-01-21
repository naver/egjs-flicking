/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Control from "~/control/Control";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

class FreeControl extends Control {
  public moveToPosition(position: number, duration: number) {
    const flicking = this._flicking;

    if (!flicking) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }


    this._input.animateTo(position, duration);
  }
}

export default FreeControl;
