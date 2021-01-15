/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Control, { ControlOption } from "./Control";

export interface SnapControlOption extends ControlOption {
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
}

export default SnapControl;
