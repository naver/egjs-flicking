/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";
import { SetSizeParams } from "../types/params";
import { getElementSize, getStyle, isString } from "../utils";

export interface ViewportPadding {
  /** CSS `padding-left` */
  left: number;
  /** CSS `padding-right` */
  right: number;
  /** CSS `padding-top` */
  top: number;
  /** CSS `padding-bottom` */
  bottom: number;
}

/**
 * A component that manages viewport size
 */
class Viewport {
  private _flicking: Flicking;
  private _el: HTMLElement;
  private _width: number;
  private _height: number;
  private _isBorderBoxSizing: boolean;
  private _padding: ViewportPadding;

  /**
   * A viewport(root) element
   * @readonly
   */
  public get element(): HTMLElement {
    return this._el;
  }

  /**
   * Viewport width, without paddings
   * @readonly
   */
  public get width(): number {
    return this._width - this._padding.left - this._padding.right;
  }
  /**
   * Viewport height, without paddings
   * @readonly
   */
  public get height(): number {
    return this._height - this._padding.top - this._padding.bottom;
  }
  /**
   * Viewport paddings
   * @readonly
   */
  public get padding(): ViewportPadding {
    return this._padding;
  }

  /**
   * @param flicking - Flicking instance
   * @param el - A viewport element
   */
  public constructor(flicking: Flicking, el: HTMLElement) {
    this._flicking = flicking;
    this._el = el;
    this._width = 0;
    this._height = 0;
    this._padding = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this._isBorderBoxSizing = false;
  }

  /**
   * Change viewport's size.
   * @remarks
   * This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property
   * @param size - {@link SetSizeParams}
   */
  public setSize(size: SetSizeParams) {
    const { width, height } = size;

    const el = this._el;
    const padding = this._padding;
    const isBorderBoxSizing = this._isBorderBoxSizing;

    if (width != null) {
      if (isString(width)) {
        el.style.width = width;
      } else {
        const newWidth = isBorderBoxSizing ? width + padding.left + padding.right : width;
        el.style.width = `${newWidth}px`;
      }
    }
    if (height != null) {
      if (isString(height)) {
        el.style.height = height;
      } else {
        const newHeight = isBorderBoxSizing ? height + padding.top + padding.bottom : height;
        el.style.height = `${newHeight}px`;
      }
    }
    this.resize();
  }

  /**
   * Measure the current size of the viewport element without updating {@link Viewport.width | width}/{@link Viewport.height | height}
   * @internal
   * @privateRemarks
   * Used inside {@link Flicking.resize} to determine whether the panels should be re-rendered (optimizeSizeUpdate)
   * while keeping the previous viewport size until the re-rendering finishes.
   * The new size is committed afterwards by calling {@link Viewport.resize | resize()}.
   * @returns Current width/height of the viewport element, without paddings
   */
  public measureSize(): { width: number; height: number } {
    const { width, height, padding } = this._measure();

    return {
      width: width - padding.left - padding.right,
      height: height - padding.top - padding.bottom
    };
  }

  /**
   * Update width/height to the current viewport element's size
   */
  public resize() {
    const { width, height, padding, isBorderBoxSizing } = this._measure();

    this._width = width;
    this._height = height;
    this._padding = padding;
    this._isBorderBoxSizing = isBorderBoxSizing;
  }

  private _measure() {
    const el = this._el;
    const elStyle = getStyle(el);
    const { useFractionalSize } = this._flicking;

    return {
      width: getElementSize({
        el,
        horizontal: true,
        useFractionalSize,
        useOffset: false,
        style: elStyle
      }),
      height: getElementSize({
        el,
        horizontal: false,
        useFractionalSize,
        useOffset: false,
        style: elStyle
      }),
      padding: {
        left: elStyle.paddingLeft ? parseFloat(elStyle.paddingLeft) : 0,
        right: elStyle.paddingRight ? parseFloat(elStyle.paddingRight) : 0,
        top: elStyle.paddingTop ? parseFloat(elStyle.paddingTop) : 0,
        bottom: elStyle.paddingBottom ? parseFloat(elStyle.paddingBottom) : 0
      },
      isBorderBoxSizing: elStyle.boxSizing === "border-box"
    };
  }
}

export default Viewport;
