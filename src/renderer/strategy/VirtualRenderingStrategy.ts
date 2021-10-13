/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import { PanelOptions } from "../../core/panel/Panel";
import VirtualPanel from "../../core/panel/VirtualPanel";
import VirtualElementProvider from "../../core/panel/provider/VirtualElementProvider";
import { parsePanelAlign, range } from "../../utils";

import RenderingStrategy from "./RenderingStrategy";

class VirtualRenderingStrategy extends RenderingStrategy {
  public renderPanels(flicking: Flicking) {
    const virtualManager = flicking.virtual;
    const visiblePanels = flicking.visiblePanels as VirtualPanel[];
    const invisibleIndexes = range(flicking.panelsPerView + 1);

    visiblePanels.forEach(panel => {
      const elementIndex = panel.elementIndex;

      panel.render();

      virtualManager.show(elementIndex);
      invisibleIndexes[elementIndex] = -1;
    });

    invisibleIndexes
      .filter(val => val >= 0)
      .forEach(idx => {
        virtualManager.hide(idx);
      });
  }

  public getRenderingElementsByOrder(flicking: Flicking) {
    const virtualManager = flicking.virtual;
    const visiblePanels = [...flicking.visiblePanels]
      .filter(panel => panel.rendered)
      .sort((panel1, panel2) => {
        return (panel1.position + panel1.offset) - (panel2.position + panel2.offset);
      }) as VirtualPanel[];

    if (visiblePanels.length <= 0) return virtualManager.elements.map(el => el.nativeElement);

    const visibleElements = visiblePanels.map(panel => panel.element);
    const invisibleElements = virtualManager.elements
      .filter(el => !el.visible)
      .map(el => el.nativeElement);

    return [...visibleElements, ...invisibleElements];
  }

  public updateRenderingPanels(flicking: Flicking) {
    this._showOnlyVisiblePanels(flicking);
  }

  public collectPanels(flicking: Flicking) {
    const align = parsePanelAlign(flicking.renderer.align);

    return range(flicking.panelsPerView + 1).map(index => new VirtualPanel({
      index,
      elementProvider: new VirtualElementProvider(flicking, index),
      align,
      flicking
    }));
  }

  public createPanel(options: PanelOptions) {
    return new VirtualPanel({
      ...options,
      elementProvider: new VirtualElementProvider(options.flicking, options.index)
    });
  }
}

export default VirtualRenderingStrategy;
