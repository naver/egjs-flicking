/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel, { PanelOptions } from "./Panel";

export interface ExternalPanelOptions<T> extends PanelOptions {
  externalComponent: T;
}

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
abstract class ExternalPanel<T = any> extends Panel {
  protected _externalComponent: T;

  /**
   * @param {object} options An options object<ko>옵션 오브젝트</ko>
   * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
   * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
   */
  public constructor(options: ExternalPanelOptions<T>) {
    super(options);

    this._externalComponent = options.externalComponent;
  }
}

export default ExternalPanel;
