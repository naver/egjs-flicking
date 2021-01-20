import Flicking, { FlickingOption } from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import { ALIGN } from "~/const/external";
import * as ERROR from "~/const/error";
import { checkExistence, parseAlign } from "~/utils";

export interface CameraOption {
  align: FlickingOption["align"];
}

abstract class Camera {
  // Options
  protected _align: FlickingOption["align"];

  // Internal states
  protected _flicking: Flicking | null;
  protected _el: HTMLElement;
  protected _position: number;
  protected _alignPos: number;
  protected _range: { min: number; max: number };

  public constructor({
    align = ALIGN.PREV
  }: Partial<CameraOption> = {}) {
    this._flicking = null;
    this._position = 0;
    this._alignPos = 0;
    this._range = { min: 0, max: 0 };

    // Options
    this._align = align;
  }

  public init(flicking: Flicking): this {
    this._flicking = flicking;

    const viewportEl = flicking.getViewport().getElement();

    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild as HTMLElement;

    this.updateAlignPos();

    return this;
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

    if (!flicking) {
      throw new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Camera"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
    }

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
