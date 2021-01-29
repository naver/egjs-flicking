/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Control from "~/control/Control";
import { requireFlicking } from "~/utils";

class FreeControl extends Control {
  @requireFlicking("Control")
  public moveToPosition(position: number, duration: number) {
    return this._controller!.animateTo(position, duration);
  }
}

export default FreeControl;
