/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "~/Flicking";
import Animator from "~/control/Animator";
import Input from "~/control/Input";

export interface ControlOption {

}

abstract class Control {
  // Internal States
  private _flicking: Flicking | null;
  private _animator: Animator;
  private _input: Input;

  public constructor() {
    this._flicking = null;
    this._animator = new Animator();
    this._input = new Input();
  }

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._input.init(flicking);
    return this;
  }

  public destroy(): this {
    this._input.destroy();
    return this;
  }

  public moveTo(index: number, duration: number) {

  }
}

export default Control;
