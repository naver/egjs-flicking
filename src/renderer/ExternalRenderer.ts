/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel from "../core/panel/Panel";
import VirtualPanel from "../core/panel/VirtualPanel";
import { getFlickingAttached } from "../utils";

import Renderer from "./Renderer";

/**
 *
 */
abstract class ExternalRenderer extends Renderer {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null): void {
    // DO NOTHING, overrided to prevent an unexpected error
  }

  protected _removePanelElements(panels: Panel[]): void {
    // DO NOTHING, overrided to prevent an unexpected error
  }

  protected _removeAllChildsFromCamera(): void {
    // DO NOTHING, overrided to prevent an unexpected error
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  protected _renderVirtualPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const virtualManager = this._virtualManager;

    if (!virtualManager) return;

    const elements = virtualManager.elements;
    const visiblePanels = flicking.visiblePanels as VirtualPanel[];
    const invisibles = elements.map((_, idx) => idx);

    visiblePanels.forEach(panel => {
      const virtualEl = panel.virtualElement;

      invisibles[virtualEl.index] = -1;
      virtualEl.renderingPanel = panel;
      virtualEl.show();
      panel.markForShow();
    });

    invisibles.filter(val => val >= 0)
      .forEach(idx => {
        const virtualEl = elements[idx];
        virtualEl.hide();
        virtualEl.renderingPanel?.markForHide();
        virtualEl.renderingPanel = null;
      });
  }
}

export default ExternalRenderer;
