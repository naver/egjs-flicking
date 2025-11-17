/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import { PanelOptions } from "../../core/panel/Panel";
import VirtualPanel from "../../core/panel/VirtualPanel";
import VirtualElementProvider from "../../core/panel/provider/VirtualElementProvider";
import { parsePanelAlign, range, setSize } from "../../utils";

import RenderingStrategy from "./RenderingStrategy";

class VirtualRenderingStrategy implements RenderingStrategy {
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

  public getRenderingIndexesByOrder(flicking: Flicking) {
    const virtualManager = flicking.virtual;
    const visiblePanels = [...flicking.visiblePanels]
      .filter(panel => panel.rendered)
      .sort((panel1, panel2) => {
        return (panel1.position + panel1.offset) - (panel2.position + panel2.offset);
      }) as VirtualPanel[];

    if (visiblePanels.length <= 0) return virtualManager.elements.map((_, idx) => idx);

    const visibleIndexes = visiblePanels.map(panel => panel.elementIndex);
    const invisibleIndexes = virtualManager.elements
      .map((el, idx) => ({ ...el, idx }))
      .filter(el => !el.visible)
      .map(el => el.idx);

    return [...visibleIndexes, ...invisibleIndexes];
  }

  public getRenderingElementsByOrder(flicking: Flicking) {
    const virtualManager = flicking.virtual;
    const elements = virtualManager.elements;

    return this.getRenderingIndexesByOrder(flicking).map(index => elements[index].nativeElement);
  }

  public updateRenderingPanels(flicking: Flicking) {
    const panels = flicking.renderer.panels;
    const camera = flicking.camera;

    const visibleIndexes = camera.visiblePanels.reduce((visibles, panel) => {
      visibles[panel.index] = true;
      return visibles;
    }, {});

    panels.forEach(panel => {
      if (panel.index in visibleIndexes || panel.loading) {
        panel.markForShow();
      } else {
        panel.markForHide();
      }
    });

    camera.updateOffset();
  }

  public collectPanels(flicking: Flicking) {
    const align = parsePanelAlign(flicking.renderer.align);

    return range(flicking.virtual.initialPanelCount).map(index => new VirtualPanel({
      index,
      elementProvider: new VirtualElementProvider(flicking),
      align,
      flicking
    }));
  }

  public createPanel(_el: any, options: PanelOptions) {
    return new VirtualPanel({
      ...options,
      elementProvider: new VirtualElementProvider(options.flicking)
    });
  }

  public updatePanelSizes(flicking: Flicking, size: Partial<{
    width: number | string;
    height: number | string;
  }>) {
    flicking.virtual.elements.forEach(el => {
      setSize(el.nativeElement, size);
    });
    flicking.panels.forEach(panel => panel.setSize(size));
  }
}

export default VirtualRenderingStrategy;
