/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached } from "../utils";

import Camera from "./Camera";

/**
 * A {@link Camera} that can move from the position of the first panel to the position of the last panel
 * @ko 첫번째 패널의 좌표로부터 마지막 패널의 좌표로까지 이동할 수 있는 종류의 {@link Camera}
 */
class LinearCamera extends Camera {
  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera의 {@link Camera#range range}를 업데이트합니다
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
   * @return {this}
   */
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking);
    const renderer = flicking.renderer;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.panelCount - 1);

    this._range = { min: firstPanel?.position ?? 0, max: lastPanel?.position ?? 0 };
    return this;
  }
}

export default LinearCamera;
