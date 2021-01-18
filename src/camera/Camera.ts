import Flicking, { FlickingOptions } from "~/Flicking";
import * as OPTIONS from "~/const/option";
import { parseAlign } from "~/utils";

export interface CameraOption {
  align: FlickingOptions["align"];
}

abstract class Camera {
  // Options
  protected _align: FlickingOptions["align"];

  // Internal states
  protected _flicking: Flicking | null;
  protected _el: HTMLElement;
  protected _position: number;
  protected _alignPos: number;
  protected _range: { min: number; max: number };

  public constructor({
    align = OPTIONS.ALIGN.PREV
  }: Partial<CameraOption> = {}) {
    this._flicking = null;
    this._position = 0;
    this._alignPos = 0;
    this._range = { min: 0, max: 0 };

    // Options
    this._align = align;
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;

    const viewportEl = flicking.getViewport().getElement();

    if (viewportEl.firstElementChild == null) {
      throw new Error("First element child of the viewport element should be not null");
    }
    this._el = viewportEl.firstElementChild as HTMLElement;

    this.updateAlignPos();
  }

  public destroy(): this {
    this._flicking = null;
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
