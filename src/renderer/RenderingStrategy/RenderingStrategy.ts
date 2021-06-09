/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";

interface RenderingStrategy {
  updateRenderingPanels(flicking: Flicking): void;
}

export default RenderingStrategy;
