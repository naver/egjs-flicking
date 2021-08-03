/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";

abstract class RenderingStrategy {
  public abstract updateRenderingPanels(flicking: Flicking): void;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updatePanelSizes(flicking: Flicking): void {
    flicking.panels.forEach(panel => panel.resize());
  }
}

export default RenderingStrategy;
