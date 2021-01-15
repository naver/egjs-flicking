/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { MOVE_TYPE } from "../consts";
import Control, { ControlOption } from "./Control";

export interface FreeControlOption extends ControlOption {

}

class FreeControl extends Control {
  public constructor() {
    super();
  }
}

export default FreeControl;
