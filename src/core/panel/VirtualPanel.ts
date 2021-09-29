/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { DIRECTION } from "../../const/external";
import { circulateIndex } from "../../utils";

import Panel, { PanelOptions } from "./Panel";

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
class VirtualPanel extends Panel {
  private _rendered: boolean;
  private _cachedInnerHTML: string | null;

  /**
   * `HTMLElement` that panel's referencing
   * @ko 패널이 참조하고 있는 `HTMLElement`
   * @type {HTMLElement}
   * @readonly
   */
  public get element() {
    return this.virtualElement.element;
  }

  /**
   * `VirtualElement` that panel's referencing
   * @ko 패널이 참조하고있는 `VirtualElement`
   * @type {VirtualElement}
   * @readonly
   */
  public get virtualElement() {
    const flicking = this._flicking;
    const virtual = flicking.virtual!;

    return virtual.elements[circulateIndex(this._virtualIndex, virtual.elements.length)];
  }

  public get rendered() { return this._rendered; }

  /**
   * Cached innerHTML by the previous render function
   * @ko 이전 더링에서 캐시된 innerHTML 정보
   * @type {string|null}
   * @readonly
   */
  public get cachedInnerHTML() {
    return this._cachedInnerHTML;
  }

  private get _virtualIndex() {
    const flicking = this._flicking;
    const panelCount = flicking.panelCount;
    let index = this._index;

    if (this._toggled) {
      // To prevent element duplication
      index = this._toggleDirection === DIRECTION.NEXT
        ? index + panelCount
        : index - panelCount;
    }

    return index;
  }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   */
  public constructor(options: PanelOptions) {
    super(options);

    this._rendered = true;
    this._cachedInnerHTML = null;
  }

  public markForShow() {
    this._rendered = true;
  }

  public markForHide() {
    this._rendered = false;
  }

  public cacheRenderResult(result: string) {
    this._cachedInnerHTML = result;
  }

  public uncacheRenderResult() {
    this._cachedInnerHTML = null;
  }
}

export default VirtualPanel;
