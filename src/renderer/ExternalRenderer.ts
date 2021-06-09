/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/panel/Panel";

import Renderer from "./Renderer";

/**
 *
 */
abstract class ExternalRenderer extends Renderer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null): void {
    // DO NOTHING
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _removePanelElements(panels: Panel[]): void {
    // DO NOTHING
  }
}

export default ExternalRenderer;
