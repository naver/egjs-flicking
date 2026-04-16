import Flicking, { EVENTS, FlickingError, Plugin } from "@egjs/flicking";
import { ARROW } from "./const";
import { BROWSER } from "./event";
import { addClass, getElement, removeClass } from "./utils";

/**
 * Options for the {@link Arrow} plugin
 */
export interface ArrowOptions {
  /**
   * The parent element to search for arrow elements. If `null`, the Flicking element is used
   * @defaultValue null
   */
  parentEl: HTMLElement | null;
  /**
   * CSS selector for the "previous" arrow element
   * @defaultValue ".flicking-arrow-prev"
   */
  prevElSelector: string;
  /**
   * CSS selector for the "next" arrow element
   * @defaultValue ".flicking-arrow-next"
   */
  nextElSelector: string;
  /**
   * CSS class added to an arrow element when it is disabled (at the start/end of non-circular Flicking)
   * @defaultValue "flicking-arrow-disabled"
   */
  disabledClass: string;
  /**
   * Number of panels to move when an arrow is clicked
   * @defaultValue 1
   */
  moveCount: number;
  /**
   * Whether to move by viewport size instead of panel count
   * @defaultValue false
   */
  moveByViewportSize: boolean;
}

/**
 * A plugin to easily create prev/next arrow buttons for Flicking
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/arrow | Demo: Arrow}
 */
class Arrow implements Plugin {
  /* Internal Values */
  private _flicking: Flicking | null = null;
  private _prevEl: HTMLElement;
  private _nextEl: HTMLElement;

  /* Options */
  private _parentEl: ArrowOptions["parentEl"];
  private _prevElSelector: ArrowOptions["prevElSelector"];
  private _nextElSelector: ArrowOptions["nextElSelector"];
  private _disabledClass: ArrowOptions["disabledClass"];
  private _moveCount: ArrowOptions["moveCount"];
  private _moveByViewportSize: ArrowOptions["moveByViewportSize"];

  /** The "previous" arrow HTMLElement
   * @readonly
   */
  public get prevEl() {
    return this._prevEl;
  }
  /** The "next" arrow HTMLElement
   * @readonly
   */
  public get nextEl() {
    return this._nextEl;
  }

  /** Current value of the {@link ArrowOptions.parentEl | parentEl} option. */
  public get parentEl() {
    return this._parentEl;
  }
  /** Current value of the {@link ArrowOptions.prevElSelector | prevElSelector} option. */
  public get prevElSelector() {
    return this._prevElSelector;
  }
  /** Current value of the {@link ArrowOptions.nextElSelector | nextElSelector} option. */
  public get nextElSelector() {
    return this._nextElSelector;
  }
  /** Current value of the {@link ArrowOptions.disabledClass | disabledClass} option. */
  public get disabledClass() {
    return this._disabledClass;
  }
  /** Current value of the {@link ArrowOptions.moveCount | moveCount} option. */
  public get moveCount() {
    return this._moveCount;
  }
  /** Current value of the {@link ArrowOptions.moveByViewportSize | moveByViewportSize} option. */
  public get moveByViewportSize() {
    return this._moveByViewportSize;
  }

  /** Sets {@link ArrowOptions.parentEl | parentEl}. */
  public set parentEl(val: ArrowOptions["parentEl"]) {
    this._parentEl = val;
  }
  /** Sets {@link ArrowOptions.prevElSelector | prevElSelector}. */
  public set prevElSelector(val: ArrowOptions["prevElSelector"]) {
    this._prevElSelector = val;
  }
  /** Sets {@link ArrowOptions.nextElSelector | nextElSelector}. */
  public set nextElSelector(val: ArrowOptions["nextElSelector"]) {
    this._nextElSelector = val;
  }
  /** Sets {@link ArrowOptions.disabledClass | disabledClass}. */
  public set disabledClass(val: ArrowOptions["disabledClass"]) {
    this._disabledClass = val;
  }
  /** Sets {@link ArrowOptions.moveCount | moveCount}. */
  public set moveCount(val: ArrowOptions["moveCount"]) {
    this._moveCount = val;
  }
  /** Sets {@link ArrowOptions.moveByViewportSize | moveByViewportSize}. */
  public set moveByViewportSize(val: ArrowOptions["moveByViewportSize"]) {
    this._moveByViewportSize = val;
  }

  /**
   * @param options - Options for the Arrow instance
   * @example
   * ```ts
   * flicking.addPlugins(new Arrow({ parentEl: null, prevElSelector: ".flicking-arrow-prev", nextElSelector: ".flicking-arrow-next" }));
   * ```
   */
  public constructor(options: Partial<ArrowOptions> = {}) {
    const {
      parentEl = null,
      prevElSelector = ARROW.PREV_SELECTOR,
      nextElSelector = ARROW.NEXT_SELECTOR,
      disabledClass = ARROW.DISABLED_CLASS,
      moveCount = 1,
      moveByViewportSize = false
    } = options;

    this._parentEl = parentEl;
    this._prevElSelector = prevElSelector;
    this._nextElSelector = nextElSelector;
    this._disabledClass = disabledClass;
    this._moveCount = moveCount;
    this._moveByViewportSize = moveByViewportSize;
  }

  /** Initialize the plugin and attach arrow event listeners to the Flicking instance.
   * @param flicking - The Flicking instance to attach this plugin to
   */
  public init(flicking: Flicking): void {
    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;

    flicking.on(EVENTS.MOVE, this._onAnimation);

    const parentEl = this._parentEl ? this._parentEl : flicking.element;
    const prevEl = getElement(this._prevElSelector, parentEl, "Arrow");
    const nextEl = getElement(this._nextElSelector, parentEl, "Arrow");

    [BROWSER.MOUSE_DOWN, BROWSER.TOUCH_START].forEach(evt => {
      prevEl.addEventListener(evt, this._preventInputPropagation, { passive: true });
      nextEl.addEventListener(evt, this._preventInputPropagation, { passive: true });
    });

    prevEl.addEventListener(BROWSER.CLICK, this._onPrevClick);
    nextEl.addEventListener(BROWSER.CLICK, this._onNextClick);

    this._prevEl = prevEl;
    this._nextEl = nextEl;

    this.update();
  }

  /** Destroy the plugin and remove all arrow event listeners. */
  public destroy(): void {
    const flicking = this._flicking;

    if (!flicking) {
      return;
    }

    flicking.off(EVENTS.MOVE, this._onAnimation);

    const prevEl = this._prevEl;
    const nextEl = this._nextEl;

    [BROWSER.MOUSE_DOWN, BROWSER.TOUCH_START].forEach(evt => {
      prevEl.removeEventListener(evt, this._preventInputPropagation);
      nextEl.removeEventListener(evt, this._preventInputPropagation);
    });

    prevEl.removeEventListener(BROWSER.CLICK, this._onPrevClick);
    nextEl.removeEventListener(BROWSER.CLICK, this._onNextClick);
    this._flicking = null;
  }

  /** Update the arrow disabled/enabled state based on the current camera position. */
  public update(): void {
    this._updateClass(this._flicking!.camera.position);
  }

  private _preventInputPropagation = (e: Event) => {
    e.stopPropagation();
  };

  private _onPrevClick = () => {
    const flicking = this._flicking!;
    const camera = flicking.camera;
    const anchorPoints = camera.anchorPoints;

    if (flicking.animating || anchorPoints.length <= 0) return;

    const firstAnchor = anchorPoints[0];
    const moveCount = this._moveCount;

    if (this._moveByViewportSize) {
      flicking.control.moveToPosition(camera.position - camera.size, flicking.duration).catch(this._onCatch);
    } else {
      if (flicking.circularEnabled) {
        let targetPanel = flicking.currentPanel;

        for (let i = 0; i < moveCount; i++) {
          targetPanel = targetPanel.prev()!;
        }

        targetPanel.focus().catch(this._onCatch);
      } else if (flicking.index > firstAnchor.panel.index) {
        flicking.moveTo(Math.max(flicking.index - moveCount, firstAnchor.panel.index)).catch(this._onCatch);
      } else if (camera.position > camera.range.min) {
        flicking.moveTo(flicking.index).catch(this._onCatch);
      }
    }
  };

  private _onNextClick = () => {
    const flicking = this._flicking!;

    const camera = flicking.camera;
    const anchorPoints = camera.anchorPoints;

    if (flicking.animating || anchorPoints.length <= 0) return;

    const lastAnchor = anchorPoints[anchorPoints.length - 1];
    const moveCount = this._moveCount;

    if (this._moveByViewportSize) {
      flicking.control.moveToPosition(camera.position + camera.size, flicking.duration).catch(this._onCatch);
    } else {
      if (flicking.circularEnabled) {
        let targetPanel = flicking.currentPanel;

        for (let i = 0; i < moveCount; i++) {
          targetPanel = targetPanel.next()!;
        }

        targetPanel.focus().catch(this._onCatch);
      } else if (flicking.index < lastAnchor.panel.index) {
        flicking.moveTo(Math.min(flicking.index + moveCount, lastAnchor.panel.index)).catch(this._onCatch);
      } else if (camera.position > camera.range.min) {
        flicking.moveTo(flicking.index).catch(this._onCatch);
      }
    }
  };

  private _onAnimation = () => {
    const flicking = this._flicking!;
    const camera = flicking.camera;
    const controller = flicking.control.controller;

    if (flicking.holding) {
      this._updateClass(camera.position);
    } else {
      this._updateClass(controller.animatingContext.end);
    }
  };

  private _updateClass(pos: number) {
    const flicking = this._flicking!;
    const disabledClass = this._disabledClass;
    const prevEl = this._prevEl;
    const nextEl = this._nextEl;
    const cameraRange = flicking.camera.range;

    const stopAtPrevEdge = flicking.circularEnabled ? false : pos <= cameraRange.min;
    const stopAtNextEdge = flicking.circularEnabled ? false : pos >= cameraRange.max;

    if (stopAtPrevEdge) {
      addClass(prevEl, disabledClass);
    } else {
      removeClass(prevEl, disabledClass);
    }

    if (stopAtNextEdge) {
      addClass(nextEl, disabledClass);
    } else {
      removeClass(nextEl, disabledClass);
    }
  }

  private _onCatch = (err: Error) => {
    if (err instanceof FlickingError) return;
    throw err;
  };
}

export default Arrow;
