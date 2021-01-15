import Component from "@egjs/component";

import Flicking from "~/Flicking";
import * as OPTIONS from "~/const/option";
import { LiteralUnion, ValueOf } from "~/types";
import { parseAlign } from "~/utils";

export interface CameraOption {
  align: LiteralUnion<ValueOf<typeof OPTIONS.ALIGN>> | number;
}

abstract class Camera extends Component {
  // Options
  protected _align: CameraOption["align"];

  // Internal states
  protected _flicking: Flicking;
  protected _el: HTMLElement;
  protected _position: number;
  protected _alignPos: number;
  protected _range: { min: number; max: number };

  public constructor({
    align = OPTIONS.ALIGN.PREV
  }: Partial<CameraOption> = {}) {
    super();

    this._position = 0;
    this._alignPos = 0;
    this._range = { min: 0, max: 0 };
    this._align = align;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;

    this.updateAlignPos();
  }

  public destroy(): this {
    return this;
  }

  public getElement() {
    return this._el;
  }

  public getPosition() {
    return this._position;
  }

  public getAlignPosition() {
    return this._alignPos;
  }

  public getRange() {
    return this._range;
  }

  public lookAt(pos: number): this {
    this._position = pos;
    this._applyTransform();
    return this;
  }

  public updateAlignPos(): this {
    const flicking = this._flicking;

    if (!flicking) return this;

    this._alignPos = parseAlign(this._align, flicking.getViewport().getSize().width);

    return this;
  }

  private _applyTransform() {
    const el = this._el;

    el.style.transform = `translate(${-(this._position - this._alignPos)}px)`;
  }

  public abstract updateRange(): this;
}

export default Camera;
