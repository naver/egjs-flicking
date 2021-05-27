/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";

import RenderingStrategy from "./RenderingStrategy";

class VisibleRenderingStrategy implements RenderingStrategy {
  public updateRenderingPanels(flicking: Flicking) {
    const panels = flicking.renderer.panels;
    const camera = flicking.camera;

    // During the input sequence,
    // Do not remove panel elements as it won't trigger touchend event.
    if (!flicking.holding) {
      panels.forEach(panel => {
        panel.markForHide();
      });
    }

    camera.visiblePanels.forEach(panel => {
      panel.markForShow();
    });

    camera.updateOffset();
  }
}

export default VisibleRenderingStrategy;
