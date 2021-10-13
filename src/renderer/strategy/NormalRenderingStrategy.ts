/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import { PanelOptions } from "../../core/panel/Panel";
import { DIRECTION } from "../../const/external";
import { parsePanelAlign } from "../../utils";

import RenderingStrategy from "./RenderingStrategy";

class NormalRenderingStrategy extends RenderingStrategy {
  public renderPanels() {
    // DO_NOTHING
  }

  public getRenderingElementsByOrder(flicking: Flicking) {
    const renderedPanels = flicking.renderer.panels.filter(panel => panel.rendered);
    const toggledPrev = renderedPanels.filter(panel => panel.toggled && panel.toggleDirection === DIRECTION.PREV);
    const toggledNext = renderedPanels.filter(panel => panel.toggled && panel.toggleDirection === DIRECTION.NEXT);
    const notToggled = renderedPanels.filter(panel => panel.toggled);

    return [...toggledPrev, ...notToggled, ...toggledNext].map(panel => panel.element);
  }

  public updateRenderingPanels(flicking: Flicking) {
    if (flicking.renderOnlyVisible) {
      this._showOnlyVisiblePanels(flicking);
    } else {
      flicking.panels.forEach(panel => panel.markForShow());
    }
  }

  public collectPanels(
    flicking: Flicking,
    elements: any[]
  ) {
    const align = parsePanelAlign(flicking.renderer.align);

    return elements.map((el, index) => new this._panelCtor({
      index,
      elementProvider: new this._providerCtor(el),
      align,
      flicking
    }));
  }

  public createPanel(
    element: any,
    options: Omit<PanelOptions, "elementProvider">
  ) {
    return new this._panelCtor({
      ...options,
      elementProvider: new this._providerCtor(element)
    });
  }
}

export default NormalRenderingStrategy;
