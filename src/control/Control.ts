/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "~/Flicking";
import Animator from "~/core/Animator";
import Input from "~/core/Input";

export interface ControlOption {

}

abstract class Control {
  // Internal States
  private _flicking: Flicking;
  private _animator: Animator;
  private _input: Input;

  public constructor() {
    this._animator = new Animator();
    this._input = new Input();
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;
  }

  public destroy(): this {
    return this;
  }

  public moveTo(index: number, duration: number) {

  }
}

export default Control;
