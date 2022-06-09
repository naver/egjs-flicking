/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";
import { getElementSize, getStyle, isString } from "../utils";

/**
 * A component that manages viewport size
 * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
 */
class Viewport {
  private _flicking: Flicking;
  private _el: HTMLElement;
  private _width: number;
  private _height: number;
  private _isBorderBoxSizing: boolean;
  private _padding: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };

  /**
   * A viewport(root) element
   * @ko 뷰포트(root) 엘리먼트
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._el; }

  /**
   * Viewport width, without paddings
   * @ko 뷰포트 너비
   * @type {number}
   * @readonly
   */
  public get width() { return this._width - this._padding.left - this._padding.right; }
  /**
   * Viewport height, without paddings
   * @ko 뷰포트 높이
   * @type {number}
   * @readonly
   */
  public get height() { return this._height - this._padding.top - this._padding.bottom; }
  /**
   * Viewport paddings
   * @ko 뷰포트 CSS padding 값
   * @type {object}
   * @property {number} left CSS `padding-left`
   * @property {number} right CSS `padding-right`
   * @property {number} top CSS `padding-top`
   * @property {number} bottom CSS `padding-bottom`
   * @readonly
   */
  public get padding() { return this._padding; }

  /**
   * @param el A viewport element<ko>뷰포트 엘리먼트</ko>
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
   * This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property
   * @ko 뷰포트 크기를 변경합니다.
   * `.flicking-viewport` 엘리먼트에 해당 크기의 CSS width/height를 적용합니다
   * @param {object} [size] New viewport size<ko>새 뷰포트 크기</ko>
   * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
   */
  public setSize({
    width,
    height
  }: Partial<{
    width: number | string;
    height: number | string;
  }>) {
    const el = this._el;
    const padding = this._padding;
    const isBorderBoxSizing = this._isBorderBoxSizing;

    if (width != null) {
      if (isString(width)) {
        el.style.width = width;
      } else {
        const newWidth = isBorderBoxSizing
          ? width + padding.left + padding.right
          : width;
        el.style.width = `${newWidth}px`;
      }
    }
    if (height != null) {
      if (isString(height)) {
        el.style.height = height;
      } else {
        const newHeight = isBorderBoxSizing
          ? height + padding.top + padding.bottom
          : height;
        el.style.height = `${newHeight}px`;
      }
    }
    this.resize();
  }

  /**
   * Update width/height to the current viewport element's size
   * @ko 현재 뷰포트 엘리먼트의 크기로 너비/높이를 업데이트합니다
   */
  public resize() {
    const el = this._el;
    const elStyle = getStyle(el);
    const {
      useFractionalSize
    } = this._flicking;

    this._width = getElementSize({
      el,
      horizontal: true,
      useFractionalSize,
      useOffset: false,
      style: elStyle
    });
    this._height = getElementSize({
      el,
      horizontal: false,
      useFractionalSize,
      useOffset: false,
      style: elStyle
    });

    this._padding = {
      left: elStyle.paddingLeft ? parseFloat(elStyle.paddingLeft) : 0,
      right: elStyle.paddingRight ? parseFloat(elStyle.paddingRight) : 0,
      top: elStyle.paddingTop ? parseFloat(elStyle.paddingTop) : 0,
      bottom: elStyle.paddingBottom ? parseFloat(elStyle.paddingBottom) : 0
    };
    this._isBorderBoxSizing = elStyle.boxSizing === "border-box";
  }
}

export default Viewport;
