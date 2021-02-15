/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { parseCSSSizeValue } from "~/utils";

class Viewport {
  private _el: HTMLElement;
  private _width: number;
  private _height: number;

  public get element() { return this._el; }

  public get width() { return this._width; }
  public get height() { return this._height; }

  public constructor(el: HTMLElement) {
    this._el = el;
    this._width = 0;
    this._height = 0;
  }

  public destroy(): this {
    return this;
  }

  /**
   * Change viewport's size. This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property.
   *
   * @param {object} [size] New viewport size
   * @param {number|string} [size.width] CSS string or number(in px)
   * @param {number|string} [size.height] CSS string or number(in px)
   */
  public setSize({
    width,
    height
  }: Partial<{
    width: number | string;
    height: number | string;
  }>) {
    const el = this._el;
    if (width != null) {
      el.style.width = parseCSSSizeValue(width);
    }
    if (height != null) {
      el.style.height = parseCSSSizeValue(height);
    }
    this.resize();
  }

  public resize() {
    const el = this._el;

    this._width = el.offsetWidth;
    this._height = el.offsetHeight;
  }
}

export default Viewport;
