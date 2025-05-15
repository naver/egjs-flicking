/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";

/**
 * A component that detects size change and trigger resize method when the autoResize option is used
 * @ko autoResize 옵션을 사용할 때 크기 변화를 감지하고 Flicking의 resize를 호출하는 컴포넌트
 */
class AutoResizer {
  private _flicking: Flicking;
  private _enabled: boolean;
  private _resizeObserver: ResizeObserver | null;
  private _resizeTimer: number;
  private _maxResizeDebounceTimer: number;

  public get enabled() { return this._enabled; }

  public constructor(flicking: Flicking) {
    this._flicking = flicking;
    this._enabled = false;
    this._resizeObserver = null;
    this._resizeTimer = -1;
    this._maxResizeDebounceTimer = -1;
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

      this._resizeObserver = resizeObserver;

      this.observe(flicking.viewport.element);

      if (flicking.resizeObservePanel) {
        this.observePanels();
      }
    } else {
      window.addEventListener("resize", this._onResize);
    }

    this._enabled = true;

    return this;
  }

  public observePanels(): this {
    this._flicking.panels.forEach(panel => {
      this.observe(panel.element);
    });
    return this;
  }

  public observe(element: HTMLElement): this {
    const resizeObserver = this._resizeObserver;

    if (!resizeObserver) return this;

    resizeObserver.observe(element);

    return this;
  }

  public unobserve(element: HTMLElement): this {
    const resizeObserver = this._resizeObserver;

    if (!resizeObserver) return this;

    resizeObserver.unobserve(element);

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
    const flicking = this._flicking;
    const resizeDebounce = flicking.resizeDebounce;
    const maxResizeDebounce = flicking.maxResizeDebounce;

    if (resizeDebounce <= 0) {
      void flicking.resize();
    } else {
      if (this._maxResizeDebounceTimer <= 0) {
        if (maxResizeDebounce > 0 && maxResizeDebounce >= resizeDebounce) {
          this._maxResizeDebounceTimer = window.setTimeout(this._doScheduledResize, maxResizeDebounce);
        }
      }

      if (this._resizeTimer > 0) {
        clearTimeout(this._resizeTimer);
        this._resizeTimer = 0;
      }

      this._resizeTimer = window.setTimeout(this._doScheduledResize, resizeDebounce);
    }
  };

  private _doScheduledResize = () => {
    clearTimeout(this._resizeTimer);
    clearTimeout(this._maxResizeDebounceTimer);

    this._maxResizeDebounceTimer = -1;
    this._resizeTimer = -1;

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
