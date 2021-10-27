/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { DIRECTION } from "../../const/external";
import { circulateIndex } from "../../utils";

import Panel, { PanelOptions } from "./Panel";
import VirtualElementProvider from "./provider/VirtualElementProvider";

interface VirtualPanelOptions extends PanelOptions {
  elementProvider: VirtualElementProvider;
}

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
class VirtualPanel extends Panel {
  protected _elProvider: VirtualElementProvider;
  protected _cachedInnerHTML: string | null;

  /**
   * `HTMLElement` that panel's referencing
   * @ko 패널이 참조하고 있는 `HTMLElement`
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._elProvider.element; }

  /**
   * Cached innerHTML by the previous render function
   * @ko 이전 렌더링에서 캐시된 innerHTML 정보
   * @type {string|null}
   * @readonly
   */
  public get cachedInnerHTML() { return this._cachedInnerHTML; }

  /**
   * An number for indexing which element it will be rendered on
   * @ko 몇 번째 엘리먼트에 렌더링될 것인지를 나타내는 숫자
   * @type {number}
   * @readonly
   */
  public get elementIndex() {
    const flicking = this._flicking;
    const virtualElCount = flicking.panelsPerView + 1;
    const panelCount = flicking.panelCount;
    let index = this._index;

    if (this._toggled) {
      // To prevent element duplication
      index = this._toggleDirection === DIRECTION.NEXT
        ? index + panelCount
        : index - panelCount;
    }

    return circulateIndex(index, virtualElCount);
  }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   */
  public constructor(options: VirtualPanelOptions) {
    super(options);

    options.elementProvider.init(this);
    this._elProvider = options.elementProvider;
    this._cachedInnerHTML = null;
  }

  public cacheRenderResult(result: string) {
    this._cachedInnerHTML = result;
  }

  public uncacheRenderResult() {
    this._cachedInnerHTML = null;
  }

  public render() {
    const flicking = this._flicking;
    const { renderPanel, cache } = flicking.virtual;

    const element = this._elProvider.element;
    const newInnerHTML = this._cachedInnerHTML || renderPanel(this, this._index);

    if (newInnerHTML === element.innerHTML) return;

    element.innerHTML = newInnerHTML;

    if (cache) {
      this.cacheRenderResult(newInnerHTML);
    }
  }

  public increaseIndex(val: number) {
    this.uncacheRenderResult();
    return super.increaseIndex(val);
  }

  public decreaseIndex(val: number) {
    this.uncacheRenderResult();
    return super.decreaseIndex(val);
  }
}

export default VirtualPanel;
