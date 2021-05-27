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

    const visibleIndexes = camera.visiblePanels.reduce((visibles, panel) => {
      visibles[panel.index] = true;
      return visibles;
    }, {});

    panels.forEach(panel => {
      if (panel.index in visibleIndexes) {
        panel.markForShow();
      } else if (!flicking.holding) {
        // During the input sequence,
        // Do not remove panel elements as it won't trigger touchend event.
        panel.markForHide();
      }
    });

    camera.updateOffset();
  }
}

export default VisibleRenderingStrategy;
