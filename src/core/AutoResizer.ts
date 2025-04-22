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

  public get enabled() {
    return this._enabled;
  }

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
        ? new ResizeObserver((entries) => this._skipFirstResize(entries))
        : new ResizeObserver((entries) => this._onResize(entries));

      this._resizeObserver = resizeObserver;

      this.observe(flicking.viewport.element);

      if (flicking.resizePanelObserve) {
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

  public unobservePanels(): this {
    this._flicking.panels.forEach(panel => {
      this.unobserve(panel.element);
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

    if (this._flicking.resizePanelObserve) {
      this.unobservePanels();
    }

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

  private _onResize = (entries: any) => {
    const flicking = this._flicking;
    const resizeDebounce = flicking.resizeDebounce;
    const maxResizeDebounce = flicking.maxResizeDebounce;

    const resizeEntryInfo = entries[0].contentRect;

    const beforeSize = {
      width: flicking.viewport.width,
      height: flicking.viewport.height,
    };

    const afterSize = {
      width: resizeEntryInfo.width,
      height: resizeEntryInfo.height,
    };

    // resize 이벤트가 발생했으나 이전과 width, height의 변화가 없다면 이후 로직을 진행하지 않는다.
    if (
      beforeSize.height === afterSize.height &&
      beforeSize.width === afterSize.width
    ) {
      return;
    }

    if (resizeDebounce <= 0) {
      void flicking.resize();
    } else {
      if (this._maxResizeDebounceTimer <= 0) {
        if (maxResizeDebounce > 0 && maxResizeDebounce >= resizeDebounce) {
          this._maxResizeDebounceTimer = window.setTimeout(
            this._doScheduledResize,
            maxResizeDebounce
          );
        }
      }

      if (this._resizeTimer > 0) {
        clearTimeout(this._resizeTimer);
        this._resizeTimer = 0;
      }

      this._resizeTimer = window.setTimeout(
        this._doScheduledResize,
        resizeDebounce
      );
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

    return (entries) => {
      if (isFirstResize) {
        isFirstResize = false;
        return;
      }
      this._onResize(entries);
    };
  })();
}

export default AutoResizer;
