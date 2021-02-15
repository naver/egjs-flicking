/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Camera from "~/camera/Camera";
import { getFlickingAttached } from "~/utils";

class BoundCamera extends Camera {
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const renderer = flicking.renderer;
    const alignPos = this._alignPos;

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.panelCount - 1);

    if (!firstPanel || !lastPanel) {
      this._range = { min: 0, max: 0 };
      return this;
    }

    const viewportSize = this.size;
    const firstPanelPrev = firstPanel.range.min;
    const lastPanelNext = lastPanel.range.max;
    const panelAreaSize = lastPanelNext - firstPanelPrev;
    const canSetBoundMode = viewportSize < panelAreaSize;

    if (canSetBoundMode) {
      this._range = { min: firstPanelPrev + alignPos, max: lastPanelNext - alignPos };
    } else {
      this._range = { min: firstPanel.position, max: lastPanel.position };
    }

    return this;
  }
}

export default BoundCamera;
