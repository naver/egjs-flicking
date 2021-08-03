/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import FlickingError from "../../core/FlickingError";
import * as ERROR from "../../const/error";

import RenderingStrategy from "./RenderingStrategy";

class GridRenderingStrategy extends RenderingStrategy {
  public updateRenderingPanels(flicking: Flicking) {
    flicking.panels.forEach(panel => panel.markForShow());
  }

  public updatePanelSizes(flicking: Flicking): void {
    const panels = flicking.panels;
    const panelsPerView = flicking.panelsPerView;

    if (panelsPerView <= 0) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("panelsPerView", panelsPerView), ERROR.CODE.WRONG_OPTION);
    }
    if (panels.length <= 0) return;

    // resize only the first panel
    const firstPanel = panels[0];
    firstPanel.resize();

    const viewportSize = flicking.camera.size;
    const gap = firstPanel.margin.prev + firstPanel.margin.next;

    const panelSize = (viewportSize - gap * (panelsPerView - 1)) / panelsPerView;
    const panelSizeObj = flicking.horizontal
      ? { width: panelSize }
      : { height: panelSize };
    const firstPanelSizeObj = {
      size: panelSize,
      height: firstPanel.height,
      margin: firstPanel.margin
    };

    if (!flicking.noPanelStyleOverride) {
      flicking.panels.forEach(panel => panel.setSize(panelSizeObj));
    }

    flicking.panels.forEach(panel => panel.resize(firstPanelSizeObj));
  }
}

export default GridRenderingStrategy;
