/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/panel/Panel";

import Renderer from "./Renderer";

/**
 * @internal
 */
abstract class ExternalRenderer extends Renderer {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  protected _removePanelElements(panels: Panel[]): void {
    // DO NOTHING, overrided to prevent an unexpected error
  }

  protected _removeAllChildsFromCamera(): void {
    // DO NOTHING, overrided to prevent an unexpected error
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export default ExternalRenderer;
