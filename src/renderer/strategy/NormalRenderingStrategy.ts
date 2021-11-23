/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import Panel, { PanelOptions } from "../../core/panel/Panel";
import ElementProvider from "../../core/panel/provider/ElementProvider";
import { DIRECTION } from "../../const/external";
import { parsePanelAlign } from "../../utils";

import RenderingStrategy from "./RenderingStrategy";

export interface NormalRenderingStrategyOptions {
  providerCtor: new (...args: any) => ElementProvider;
}


class NormalRenderingStrategy implements RenderingStrategy {
  private _providerCtor: NormalRenderingStrategyOptions["providerCtor"];

  public constructor({ providerCtor }: NormalRenderingStrategyOptions) {
    this._providerCtor = providerCtor;
  }

  public renderPanels() {
    // DO_NOTHING
  }

  public getRenderingIndexesByOrder(flicking: Flicking) {
    const renderedPanels = flicking.renderer.panels.filter(panel => panel.rendered);
    const toggledPrev = renderedPanels.filter(panel => panel.toggled && panel.toggleDirection === DIRECTION.PREV);
    const toggledNext = renderedPanels.filter(panel => panel.toggled && panel.toggleDirection === DIRECTION.NEXT);
    const notToggled = renderedPanels.filter(panel => !panel.toggled);

    return [...toggledPrev, ...notToggled, ...toggledNext].map(panel => panel.index);
  }

  public getRenderingElementsByOrder(flicking: Flicking) {
    const panels = flicking.panels;

    return this.getRenderingIndexesByOrder(flicking).map(index => panels[index].element);
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

    return elements.map((el, index) => new Panel({
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
    return new Panel({
      ...options,
      elementProvider: new this._providerCtor(element)
    });
  }

  public updatePanelSizes(flicking: Flicking, size: Partial<{
    width: number | string;
    height: number | string;
  }>) {
    flicking.panels.forEach(panel => panel.setSize(size));
  }

  private _showOnlyVisiblePanels(flicking: Flicking) {
    const panels = flicking.renderer.panels;
    const camera = flicking.camera;

    const visibleIndexes = camera.visiblePanels.reduce((visibles, panel) => {
      visibles[panel.index] = true;
      return visibles;
    }, {});

    panels.forEach(panel => {
      if (panel.index in visibleIndexes || panel.loading) {
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

export default NormalRenderingStrategy;
