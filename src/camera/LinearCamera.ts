/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "~/camera/Camera";
import { getFlickingAttached } from "~/utils";

class LinearCamera extends Camera {
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const renderer = flicking.renderer;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.getPanelCount() - 1);

    this._range = { min: firstPanel?.position ?? 0, max: lastPanel?.position ?? 0 };
    return this;
  }
}

export default LinearCamera;
