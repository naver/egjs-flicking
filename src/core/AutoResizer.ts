/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";

class AutoResizer {
  private _flicking: Flicking;
  private _enabled: boolean;
  private _resizeObserver: ResizeObserver | null;

  public get enabled() { return this._enabled; }

  public constructor(flicking: Flicking) {
    this._flicking = flicking;
    this._enabled = false;
    this._resizeObserver = null;
  }

  public enable(): this {
    const flicking = this._flicking;
    const viewport = flicking.viewport;

    if (this._enabled) {
      this.disable();
    }

    if (flicking.useResizeObserver && !!window.ResizeObserver) {
      const viewportSizeNot0 = viewport.width !== 0 || viewport.height !== 0;

      const resizeObserver = viewportSizeNot0
        ? new ResizeObserver(this._skipFirstResize)
        : new ResizeObserver(this._onResize);

      resizeObserver.observe(flicking.viewport.element);

      this._resizeObserver = resizeObserver;
    } else {
      window.addEventListener("resize", this._onResize);
    }

    this._enabled = true;

    return this;
  }

  public disable(): this {
    if (!this._enabled) return this;

    const resizeObserver = this._resizeObserver;
    if (resizeObserver) {
      resizeObserver.disconnect();
      this._resizeObserver = null;
    } else {
      window.removeEventListener("resize", this._onResize);
    }

    this._enabled = false;

    return this;
  }

  private _onResize = () => {
    void this._flicking.resize();
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _skipFirstResize = (() => {
    let isFirstResize = true;

    return (() => {
      if (isFirstResize) {
        isFirstResize = false;
        return;
      }
      this._onResize();
    });
  })();
}

export default AutoResizer;
