import Flicking, { EVENTS, Plugin } from "@egjs/flicking";

import { PAGINATION } from "../const";
import ScrollContext from "../type";
import BulletRenderer from "./renderer/BulletRenderer";
import FractionRenderer from "./renderer/FractionRenderer";
import Renderer from "./renderer/Renderer";
import ScrollBulletRenderer from "./renderer/ScrollBulletRenderer";

/**
 * Options for the {@link Pagination} plugin
 */
export interface PaginationOptions {
  /**
   * The parent element to search for the pagination wrapper. If `null`, the Flicking element is used
   * @defaultValue null
   */
  parentEl: HTMLElement | null;
  /**
   * CSS selector for the pagination wrapper element
   * @defaultValue ".flicking-pagination"
   */
  selector: string;
  /**
   * Pagination display type
   * @defaultValue "bullet"
   */
  type: "bullet" | "fraction" | "scroll";
  /**
   * CSS class prefix for pagination elements
   * @defaultValue "flicking-pagination"
   */
  classPrefix: string;
  /**
   * Maximum number of bullet indicators displayed at once (only for `"scroll"` type)
   * @defaultValue 5
   */
  bulletCount: number;
  /**
   * Custom render function for each bullet element
   */
  renderBullet: (className: string, index: number) => string;
  /**
   * Custom render function for the fraction display
   */
  renderFraction: (currentClass: string, totalClass: string) => string;
  /**
   * Custom render function for the active bullet element. If `null`, the default bullet is used
   * @defaultValue null
   */
  renderActiveBullet: ((className: string, index: number) => string) | null;
  /**
   * Format function for the current index in fraction type
   */
  fractionCurrentFormat: (index: number) => string;
  /**
   * Format function for the total count in fraction type
   */
  fractionTotalFormat: (total: number) => string;
  /**
   * Callback invoked when the scroll pagination index changes
   */
  scrollOnChange: (index: number, ctx: ScrollContext) => any;
}

/**
 * A plugin to add pagination indicators (bullets, fractions, or scrollable bullets) to Flicking
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/pagination | Demo: Pagination}
 */
class Pagination implements Plugin {
  /* Internal Values */
  private _flicking: Flicking | null = null;
  private _renderer: Renderer;
  private _wrapper: HTMLElement;

  /* Options */
  private _parentEl: PaginationOptions["parentEl"];
  private _selector: PaginationOptions["selector"];
  private _type: PaginationOptions["type"];
  private _classPrefix: PaginationOptions["classPrefix"];
  private _bulletCount: PaginationOptions["bulletCount"];
  private _renderBullet: PaginationOptions["renderBullet"];
  private _renderActiveBullet: PaginationOptions["renderActiveBullet"];
  private _renderFraction: PaginationOptions["renderFraction"];
  private _fractionCurrentFormat: PaginationOptions["fractionCurrentFormat"];
  private _fractionTotalFormat: PaginationOptions["fractionTotalFormat"];
  private _scrollOnChange: PaginationOptions["scrollOnChange"];

  /** Current value of the {@link PaginationOptions.parentEl | parentEl} option. */
  public get parentEl() {
    return this._parentEl;
  }
  /** Current value of the {@link PaginationOptions.selector | selector} option. */
  public get selector() {
    return this._selector;
  }
  /** Current value of the {@link PaginationOptions.type | type} option. */
  public get type() {
    return this._type;
  }
  /** Current value of the {@link PaginationOptions.classPrefix | classPrefix} option. */
  public get classPrefix() {
    return this._classPrefix;
  }
  /** Current value of the {@link PaginationOptions.bulletCount | bulletCount} option. */
  public get bulletCount() {
    return this._bulletCount;
  }
  /** Current value of the {@link PaginationOptions.renderBullet | renderBullet} option. */
  public get renderBullet() {
    return this._renderBullet;
  }
  /** Current value of the {@link PaginationOptions.renderActiveBullet | renderActiveBullet} option. */
  public get renderActiveBullet() {
    return this._renderActiveBullet;
  }
  /** Current value of the {@link PaginationOptions.renderFraction | renderFraction} option. */
  public get renderFraction() {
    return this._renderFraction;
  }
  /** Current value of the {@link PaginationOptions.fractionCurrentFormat | fractionCurrentFormat} option. */
  public get fractionCurrentFormat() {
    return this._fractionCurrentFormat;
  }
  /** Current value of the {@link PaginationOptions.fractionTotalFormat | fractionTotalFormat} option. */
  public get fractionTotalFormat() {
    return this._fractionTotalFormat;
  }
  /** Current value of the {@link PaginationOptions.scrollOnChange | scrollOnChange} option. */
  public get scrollOnChange() {
    return this._scrollOnChange;
  }

  /** Sets {@link PaginationOptions.parentEl | parentEl}. */
  public set parentEl(val: PaginationOptions["parentEl"]) {
    this._parentEl = val;
  }
  /** Sets {@link PaginationOptions.selector | selector}. */
  public set selector(val: PaginationOptions["selector"]) {
    this._selector = val;
  }
  /** Sets {@link PaginationOptions.type | type}. */
  public set type(val: PaginationOptions["type"]) {
    this._type = val;
  }
  /** Sets {@link PaginationOptions.classPrefix | classPrefix}. */
  public set bulletWrapperclassPrefixClass(val: PaginationOptions["classPrefix"]) {
    this._classPrefix = val;
  }
  /** Sets {@link PaginationOptions.bulletCount | bulletCount}. */
  public set bulletCount(val: PaginationOptions["bulletCount"]) {
    this._bulletCount = val;
  }
  /** Sets {@link PaginationOptions.renderBullet | renderBullet}. */
  public set renderBullet(val: PaginationOptions["renderBullet"]) {
    this._renderBullet = val;
  }
  /** Sets {@link PaginationOptions.renderActiveBullet | renderActiveBullet}. */
  public set renderActiveBullet(val: PaginationOptions["renderActiveBullet"]) {
    this._renderActiveBullet = val;
  }
  /** Sets {@link PaginationOptions.renderFraction | renderFraction}. */
  public set renderFraction(val: PaginationOptions["renderFraction"]) {
    this._renderFraction = val;
  }
  /** Sets {@link PaginationOptions.fractionCurrentFormat | fractionCurrentFormat}. */
  public set fractionCurrentFormat(val: PaginationOptions["fractionCurrentFormat"]) {
    this._fractionCurrentFormat = val;
  }
  /** Sets {@link PaginationOptions.fractionTotalFormat | fractionTotalFormat}. */
  public set fractionTotalFormat(val: PaginationOptions["fractionTotalFormat"]) {
    this._fractionTotalFormat = val;
  }
  /** Sets {@link PaginationOptions.scrollOnChange | scrollOnChange}. */
  public set scrollOnChange(val: PaginationOptions["scrollOnChange"]) {
    this._scrollOnChange = val;
  }

  /**
   * @param options - Options for the Pagination instance
   * @example
   * ```ts
   * flicking.addPlugins(new Pagination({ type: "bullet", selector: ".flicking-pagination" }));
   * ```
   */
  public constructor(options: Partial<PaginationOptions> = {}) {
    const {
      parentEl = null,
      selector = PAGINATION.SELECTOR,
      type = PAGINATION.TYPE.BULLET,
      classPrefix = PAGINATION.PREFIX,
      bulletCount = 5,
      renderBullet = (className: string) => `<span class="${className}"></span>`,
      renderActiveBullet = null,
      renderFraction = (currentClass: string, totalClass: string) =>
        `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`,
      fractionCurrentFormat = (index: number) => index.toString(),
      fractionTotalFormat = (index: number) => index.toString(),
      scrollOnChange = (index: number, ctx: ScrollContext) => ctx.moveTo(index)
    } = options;

    this._parentEl = parentEl;
    this._selector = selector;
    this._type = type;
    this._classPrefix = classPrefix;
    this._bulletCount = bulletCount;
    this._renderBullet = renderBullet;
    this._renderActiveBullet = renderActiveBullet;
    this._renderFraction = renderFraction;
    this._fractionCurrentFormat = fractionCurrentFormat;
    this._fractionTotalFormat = fractionTotalFormat;
    this._scrollOnChange = scrollOnChange;
  }

  /** Initialize the plugin, create the pagination renderer, and attach event listeners to the Flicking instance.
   * @param flicking - The Flicking instance to attach this plugin to
   */
  public init(flicking: Flicking): void {
    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;

    const type = this._type;
    const selector = this._selector;
    const parentEl = this._parentEl ? this._parentEl : flicking.element;
    const wrapper = parentEl.querySelector(selector);

    if (!wrapper) {
      throw new Error(`[Flicking-Pagination] Couldn't find element with the given selector: ${selector}`);
    }

    this._wrapper = wrapper as HTMLElement;
    this._renderer = this._createRenderer(type);

    flicking.on(EVENTS.WILL_CHANGE, this._onIndexChange);
    flicking.on(EVENTS.WILL_RESTORE, this._onIndexChange);
    flicking.on(EVENTS.PANEL_CHANGE, this.update);

    this.update();
  }

  /** Destroy the plugin, remove all event listeners, and clean up pagination DOM elements. */
  public destroy(): void {
    const flicking = this._flicking;

    if (!flicking) {
      return;
    }

    flicking.off(EVENTS.WILL_CHANGE, this._onIndexChange);
    flicking.off(EVENTS.WILL_RESTORE, this._onIndexChange);
    flicking.off(EVENTS.PANEL_CHANGE, this.update);

    this._renderer.destroy();
    this._removeAllChilds();
    this._flicking = null;
  }

  /** Re-render the pagination indicators to reflect the current panel state. */
  public update = (): void => {
    this._removeAllChilds();
    this._renderer.render();
  };

  private _createRenderer(type: PaginationOptions["type"]) {
    const options = {
      flicking: this._flicking!,
      pagination: this,
      wrapper: this._wrapper
    };

    switch (type) {
      case PAGINATION.TYPE.BULLET:
        return new BulletRenderer(options);
      case PAGINATION.TYPE.FRACTION:
        return new FractionRenderer(options);
      case PAGINATION.TYPE.SCROLL:
        return new ScrollBulletRenderer(options);
      default:
        throw new Error(`[Flicking-Pagination] type "${type}" is not supported.`);
    }
  }

  private _onIndexChange = (evt: { index: number }) => {
    this._renderer.update(evt.index);
  };

  private _removeAllChilds() {
    const wrapper = this._wrapper;

    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
  }
}

export default Pagination;
