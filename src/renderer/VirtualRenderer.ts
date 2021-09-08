/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached, range } from "../utils";
import Panel, { PanelOptions } from "../core/panel/Panel";
import VirtualPanel from "../core/panel/VirtualPanel";

import Renderer from "./Renderer";

export interface VirtualElement {
  el: HTMLElement;
  renderingPanel: Panel | null;
}

/**
 *
 */
class VirtualRenderer extends Renderer {
  private _elements: VirtualElement[] = [];

  public get elements() { return this._elements; }

  public async render() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const visiblePanels = flicking.visiblePanels;
    const renderFn = flicking.virtual!.renderPanel;
    const elements = this._elements;
    const invisibles = elements.map((_, idx) => idx);

    this._showOnlyVisiblePanels(flicking);

    visiblePanels.forEach(panel => {
      const elIdx = panel.index % elements.length;
      const virtualEl = elements[elIdx];
      const el = virtualEl.el;

      invisibles[elIdx] = -1;

      if (el.style.display) {
        el.style.display = "";
      }

      if (virtualEl.renderingPanel !== panel) {
        el.innerHTML = renderFn(panel.index);
        virtualEl.renderingPanel = panel;
      }
    });

    invisibles.filter(val => val >= 0)
      .forEach(idx => {
        elements[idx].el.style.display = "none";
      });

    this._resetPanelElementOrder();

    return Promise.resolve();
  }

  public async forceRenderAllPanels() {
    this._elements.forEach(virtualEl => {
      virtualEl.el.style.display = "";
    });

    return Promise.resolve();
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const panelsPerView = flicking.panelsPerView;
    const initialPanelCount = flicking.virtual!.initialPanelCount;
    const fragment = document.createDocumentFragment();

    // Remove all child elements in the camera element
    this._removeAllChildsFromCamera();

    range(panelsPerView + 1).forEach(() => {
      const panelEl = document.createElement("div");
      panelEl.className = "flicking-panel";
      fragment.appendChild(panelEl);

      this._elements.push({
        el: panelEl,
        renderingPanel: null
      });
    });

    flicking.camera.element.appendChild(fragment);

    const align = this._getPanelAlign();
    this._panels = range(initialPanelCount)
      .map(index => new VirtualPanel({ flicking, index, align }));
  }

  protected _createPanel(el: any, options: PanelOptions) {
    return new VirtualPanel(options);
  }

  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null) {
    return this;
  }

  protected _removePanelElements(panels: Panel[]): this {
    return this;
  }

  private _resetPanelElementOrder() {
    const elements = this._elements;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const visiblePanels = flicking.visiblePanels;
    const cameraEl = flicking.camera.element;

    if (visiblePanels.length <= 0) return;

    const firstVisiblePanel = visiblePanels[0];
    const firstVisibleIndex = firstVisiblePanel.index % elements.length;

    const elementsByReversedOrder = [...elements.slice(firstVisibleIndex), ...elements.slice(0, firstVisibleIndex)].reverse();

    elementsByReversedOrder.forEach((virtualEl, idx) => {
      const nextEl = elementsByReversedOrder[idx - 1]?.el ?? null;

      if (virtualEl.el.nextElementSibling !== nextEl) {
        cameraEl.insertBefore(virtualEl.el, nextEl);
      }
    });
  }
}

export default VirtualRenderer;
