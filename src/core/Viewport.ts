/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { parseCSSSizeValue } from "~/utils";

class Viewport {
  private _el: HTMLElement;
  private _size: { width: number; height: number };

  public constructor(el: HTMLElement) {
    this._el = el;
    this._size = {
      width: 0,
      height: 0
    };
  }

  public destroy(): this {
    return this;
  }

  public get element() { return this._el; }

  /**
   * Return copy of current width/height value
   * Has size 0 at initialization
   */
  public get size() { return { ...this._size }; }

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
    this.updateSize();
  }

  public updateSize() {
    const el = this._el;

    this._size = {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}

export default Viewport;
