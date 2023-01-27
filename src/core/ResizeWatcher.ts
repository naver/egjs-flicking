/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";

import { isString } from "../utils";

export interface ResizeWatherOptions {
  resizeDebounce?: number;
  maxResizeDebounce?: number;
  useResizeObserver?: boolean;
  useWindowResize?: boolean;
  watchDirection?: "width" | "height" | "box" | false;
  rectBox?: "border-box" | "content-box";
}

class ResizeWatcher {
  private _container: HTMLElement;
  private _rect = { width: 0, height: 0 };
  private _resizeTimer = 0;
  private _maxResizeDebounceTimer = 0;
  private _emitter: Component<{ resize: void }>;
  private _observer: ResizeObserver | null;
  private _options!: Required<ResizeWatherOptions>;

  public constructor(container: HTMLElement | string, options: ResizeWatherOptions = {}) {
    this._options = {
      resizeDebounce: 100,
      maxResizeDebounce: 0,
      useResizeObserver: false,
      useWindowResize: true,
      watchDirection: false,
      rectBox: "content-box",
      ...options
    };

    this._container = isString(container) ? document.querySelector<HTMLElement>(container)! : container;
    this._init();
  }

  public getRect() {
    return this._rect;
  }

  public setRect(rect: { width: number; height: number }) {
    this._rect = { ...rect };
  }

  public resize() {
    const container = this._container;

    this.setRect(this._options.rectBox === "border-box" ? {
      width: container.offsetWidth,
      height: container.offsetHeight
    } : {
      width: container.clientWidth,
      height: container.clientHeight
    });
  }

  public listen(callback: () => void) {
    this._emitter.on("resize", callback);
    return this;
  }

  public destroy() {
    this._observer?.disconnect();
    if (this._options.useWindowResize) {
      window.removeEventListener("resize", this._onResize);
    }
  }

  private _init() {
    const container = this._container;
    const options = this._options;

    this._emitter = new Component();
    if (options.useResizeObserver && !!window.ResizeObserver) {
      this._observer = new window.ResizeObserver(this._scheduleResize);
      this._observer.observe(container, {
        box: options.rectBox
      });
    }
    if (options.useWindowResize) {
      window.addEventListener("resize", this._scheduleResize);
    }
    this.resize();
  }

  private _onResize = () => {
    clearTimeout(this._resizeTimer);
    clearTimeout(this._maxResizeDebounceTimer);

    this._maxResizeDebounceTimer = 0;
    this._resizeTimer = 0;

    const watchDirection = this._options.watchDirection;
    const prevRect = this._rect;
    this.resize();
    const rect = this._rect;
    const isWatchWidth = watchDirection === "box" || watchDirection === "width";
    const isWatchHeight = watchDirection === "box" || watchDirection === "height";
    const isResize = !watchDirection
      || (isWatchWidth && prevRect.width !== rect.width)
      || (isWatchHeight && prevRect.height !== rect.height);

    if (isResize) {
      this._emitter.trigger("resize");
    }
  };

  private _scheduleResize = () => {
    const {
      resizeDebounce,
      maxResizeDebounce
    } = this._options;


    if (!this._maxResizeDebounceTimer && maxResizeDebounce >= resizeDebounce) {
      this._maxResizeDebounceTimer = window.setTimeout(this._onResize, maxResizeDebounce);
    }

    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = 0;
    }

    this._resizeTimer = window.setTimeout(this._onResize, resizeDebounce);
  };
}

export default ResizeWatcher;
