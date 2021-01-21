/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
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

  public getElement() {
    return this._el;
  }

  /**
   * Return copy of current width/height value
   * Has size 0 at initialization
   */
  public getSize() {
    return { ...this._size };
  }

  /**
   * Change viewport's size. This will change the actual size of `.conveyer-viewport` element by changing its CSS width/height property.
   * You must call {@link Conveyer#resize} after this to take effect.
   *
   * @param {object} [size] New viewport size
   * @param {number|string} [size.width] CSS string or number(in px)
   * @param {number|string} [size.height] CSS string or number(in px)
   */
  public setSize({
    width,
    height
  }: {
    width: number | string;
    height: number | string;
  }) {
    const el = this._el;
    if (width != null) {
      if (typeof width === "string") {
        el.style.width = width;
      } else {
        el.style.width = `${width}px`;
      }
    }
    if (height != null) {
      if (typeof height === "string") {
        el.style.height = height;
      } else {
        el.style.height = `${height}px`;
      }
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
