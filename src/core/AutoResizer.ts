/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getElementSize, getStyle } from "../utils";
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

  /** */
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

      if (flicking.observePanelResize) {
        this.observePanels();
      }
    } else {
      window.addEventListener("resize", this._onResizeWrapper);
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

    if (this._flicking.observePanelResize) {
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
      window.removeEventListener("resize", this._onResizeWrapper);
    }

    this._enabled = false;

    return this;
  }

  private _onResizeWrapper = () => {
    this._onResize([]);
  };

  private _onResize = (entries: ResizeObserverEntry[]) => {
    const flicking = this._flicking;
    const resizeDebounce = flicking.resizeDebounce;
    const maxResizeDebounce = flicking.maxResizeDebounce;

    const resizedViewportElement = flicking.element;
    // 현재 구현에서 리사이즈 옵저빙 대상은 패널과 뷰포트 2개만 존재.
    // 아래는 뷰포트만 변경되었을 때 동작해야하는 로직이 있으므로 아래와 같이 조건문을 건다.
    // 패널 쪽에서는 리사이즈 감지에 resizeObserver를 사용하지 않는 경우가 없으므로 이 조건은 곧 뷰포트만 리사이즈가 된 경우를 의미한다.
    const isResizedViewportOnly = entries.find(e => e.target === flicking.element) && entries.length === 1;

    // 참고: resizeObserver를 사용하지 않은 경우에는 entries.length가 0으로 오는데 이 경우에는 그냥 항상 리사이즈가 진행되도록 한다.
    //   (vw, vh 등을 사용하는 경우 이상 동작이 발생할 여지가 있기 때문이다)
    if (isResizedViewportOnly) {
      // resize 이벤트가 발생했으나 이전과 width, height의 변화가 없다면 이후 로직을 진행하지 않는다.
      const beforeSize = {
        width: flicking.viewport.width,
        height: flicking.viewport.height
      };

      const afterSize = {
        width: getElementSize({
          el: resizedViewportElement,
          horizontal: true,
          useFractionalSize: this._flicking.useFractionalSize,
          useOffset: false,
          style: getStyle(resizedViewportElement)
        }),
        height: getElementSize({
          el: resizedViewportElement,
          horizontal: false,
          useFractionalSize: this._flicking.useFractionalSize,
          useOffset: false,
          style: getStyle(resizedViewportElement)
        })
      };

      if (
        beforeSize.height === afterSize.height &&
        beforeSize.width === afterSize.width
      ) {
        return;
      }
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
