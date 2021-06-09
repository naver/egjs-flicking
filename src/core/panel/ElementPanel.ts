/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel, { PanelOptions } from "./Panel";

export interface ElementPanelOptions extends PanelOptions {
  el: HTMLElement;
}

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
class ElementPanel extends Panel {
  private _el: HTMLElement;
  private _rendered: boolean;

  /**
   * `HTMLElement` that panel's referencing
   * @ko 패널이 참조하고 있는 `HTMLElement`
   * @type {HTMLElement}
   * @readonly
   */
  public get element() { return this._el; }

  public get rendered() { return this._rendered; }

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   */
  public constructor(options: ElementPanelOptions) {
    super(options);

    this._el = options.el;
    this._rendered = true;
  }

  public markForShow() {
    this._rendered = true;
  }

  public markForHide() {
    this._rendered = false;
  }
}

export default ElementPanel;
