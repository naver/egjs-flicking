/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";

class AutoResizer {
  private flicking: Flicking;
  private enabled: boolean;
  private resizeObserver: ResizeObserver | null;

  private skipFirstResize = (() => {
    let isFirstResize = true;

    return (() => {
      if (isFirstResize) {
        isFirstResize = false;
        return;
      }
      this.onResize();
    });
  })();

  public constructor(flicking: Flicking) {
    this.flicking = flicking;
    this.enabled = false;
    this.resizeObserver = null;
  }

  public enable(): this {
    const flicking = this.flicking;

    if (this.enabled) {
      this.disable();
    }

    if (flicking.options.useResizeObserver && !!window.ResizeObserver) {
      const flickingEl = flicking.getElement();
      const viewportSizeNot0 = flickingEl.clientWidth !== 0 || flickingEl.clientHeight !== 0;

      const resizeObserver = viewportSizeNot0
        ? new ResizeObserver(this.skipFirstResize)
        : new ResizeObserver(this.onResize);

      resizeObserver.observe(flickingEl);

      this.resizeObserver = resizeObserver;
    } else {
      window.addEventListener("resize", this.onResize);
    }

    this.enabled = true;

    return this;
  }

  public disable(): this {
    if (!this.enabled) {
      return this;
    }

    const resizeObserver = this.resizeObserver;
    if (resizeObserver) {
      resizeObserver.disconnect();
      this.resizeObserver = null;
    } else {
      window.removeEventListener("resize", this.onResize);
    }

    this.enabled = false;

    return this;
  }

  private onResize = () => {
    this.flicking.resize();
  }
}

export default AutoResizer;
