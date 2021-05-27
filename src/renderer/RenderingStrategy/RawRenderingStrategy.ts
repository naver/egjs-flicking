/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";

import RenderingStrategy from "./RenderingStrategy";

class RawRenderingStrategy implements RenderingStrategy {
  public updateRenderingPanels(flicking: Flicking) {
    // RawRenderingStrategy always renders all panel elements
    flicking.panels.forEach(panel => panel.markForShow());
  }
}

export default RawRenderingStrategy;
