/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { parseCSSSizeValue } from "~/utils";

/**
 * A component that manages viewport size
 * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
 */
class Viewport {
  private _el: HTMLElement;
  private _width: number;
  private _height: number;

  /**
   * A viewport(root) element
   * @ko 뷰포트(root) 엘리먼트
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._el; }

  /**
   * Viewport width
   * @ko 뷰포트 너비
   * @type {number}
   * @readonly
   */
  public get width() { return this._width; }
  /**
   * Viewport height
   * @ko 뷰포트 높이
   * @type {number}
   * @readonly
   */
  public get height() { return this._height; }

  /**
   * @param el A viewport element<ko>뷰포트 엘리먼트</ko>
   */
  public constructor(el: HTMLElement) {
    this._el = el;
    this._width = 0;
    this._height = 0;
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
    if (width != null) {
      el.style.width = parseCSSSizeValue(width);
    }
    if (height != null) {
      el.style.height = parseCSSSizeValue(height);
    }
    this.resize();
  }

  /**
   * Update width/height to the current viewport element's size
   * @ko 현재 뷰포트 엘리먼트의 크기로 너비/높이를 업데이트합니다
   */
  public resize() {
    const el = this._el;

    this._width = el.offsetWidth;
    this._height = el.offsetHeight;
  }
}

export default Viewport;
