/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel, { PanelOptions } from "./Panel";
import ExternalElementProvider from "./provider/ExternalElementProvider";

export interface ExternalPanelOptions extends PanelOptions {
  elementProvider: ExternalElementProvider;
}

/**
 * A slide data component that holds information of a single HTMLElement
 * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
 */
class ExternalPanel extends Panel {
  protected _elProvider: ExternalElementProvider;

  public get rendered() { return this._elProvider.rendered; }

  public constructor(options: ExternalPanelOptions) {
    super(options);

    this._elProvider = options.elementProvider;
  }

  public markForShow() {
    this._elProvider.show();

    return super.markForShow();
  }

  public markForHide() {
    this._elProvider.hide();

    return super.markForHide();
  }
}

export default ExternalPanel;
