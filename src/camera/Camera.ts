/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOption } from "~/Flicking";
import Panel from "~/core/Panel";
import { ALIGN } from "~/const/external";
import { checkExistence, parseAlign, requireFlicking } from "~/utils";

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

  public abstract updateRange(): this;

  public init(flicking: Flicking): this {
    this._flicking = flicking;

    const viewportEl = flicking.getViewport().getElement();

    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild as HTMLElement;

    return this;
  }

  public destroy(): this {
    this._flicking = null;
    return this;
  }

  // Options Getter
  public getAlign() { return this._align; }

  // Options Setter
  public setAlign(val: FlickingOption["align"]) {
    this._align = val;
  }

  public getElement() { return this._el; }
  public getPosition() { return this._position; }
  public getAlignPosition() { return this._alignPos; }
  public getRange() { return this._range; }

  @requireFlicking("Camera")
  public getPanelBelow(): Panel | null {
    return this._flicking!.getRenderer().getPanelFromPosition(this._position);
  }

  public lookAt(pos: number): this {
    this._position = pos;
    this._applyTransform();
    return this;
  }

  @requireFlicking("Camera")
  public updateAlignPos(): this {
    const flicking = this._flicking!;
    const size = flicking.getViewport().getSize();
    this._alignPos = parseAlign(this._align, flicking.isHorizontal() ? size.width : size.height);

    return this;
  }

  private _applyTransform() {
    const el = this._el;

    el.style.transform = `translate(${-(this._position - this._alignPos)}px)`;
  }
}

export default Camera;
