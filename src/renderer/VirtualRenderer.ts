/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached, getMinusCompensatedIndex, range } from "../utils";
import Panel, { PanelOptions } from "../core/panel/Panel";
import VirtualPanel from "../core/panel/VirtualPanel";

import Renderer, { RendererOptions } from "./Renderer";

export interface VirtualElement {
  el: HTMLElement;
  renderingPanel: VirtualPanel | null;
}

export interface VirtualRendererOptions extends RendererOptions {
  virtual: {
    renderPanel: (index: number, panel: VirtualPanel) => string;
    initialPanelCount: number;
  };
}

/**
 *
 */
class VirtualRenderer extends Renderer {
  private _elements: VirtualElement[] = [];
  private _renderFn: (index: number, panel: VirtualPanel) => string;
  private _initialPanelCount: number;

  public get elements() { return this._elements; }

  // Options
  public get renderPanel() { return this._renderFn; }
  public get initialPanelCount() { return this._initialPanelCount; }

  public set renderPanel(val: VirtualRendererOptions["virtual"]["renderPanel"]) { this._renderFn = val; }
  public set initialPanelCount(val: VirtualRendererOptions["virtual"]["initialPanelCount"]) {
    this._initialPanelCount = val;
    this._updateVirtualPanels();
  }

  public constructor(options: Partial<VirtualRendererOptions> = {}) {
    super(options);

    const virtual = options.virtual ?? {
      renderPanel: (index: number) => `Panel ${index}`,
      initialPanelCount: 100
    };
    this._renderFn = virtual.renderPanel;
    this._initialPanelCount = virtual.initialPanelCount;
  }

  public async render() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const visiblePanels = flicking.visiblePanels as VirtualPanel[];
    const renderFn = this._renderFn;
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
        el.innerHTML = renderFn(panel.index, panel);
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

  public append() {
    this.insert(this._panels.length);
  }

  public prepend() {
    this.insert(0);
  }

  public insert(index: number) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const align = this._getPanelAlign();
    const panels = this._panels;
    const panelsPushed = panels.slice(index);
    const insertingIdx = getMinusCompensatedIndex(index, panels.length);

    panelsPushed.forEach(panel => {
      panel.increaseIndex(1);
      panel.updatePosition();
    });

    panels.splice(insertingIdx, 0, new VirtualPanel({ align, flicking, index: insertingIdx }));
  }

  public remove(index: number) {
    const panels = this._panels;
    const removingIdx = getMinusCompensatedIndex(index, panels.length);
    const panelsPulled = panels.slice(removingIdx + 1);

    panels.splice(removingIdx, 1);

    panelsPulled.forEach(panel => {
      panel.decreaseIndex(1);
      panel.updatePosition();
    });
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const panelsPerView = flicking.panelsPerView;
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

    this._updateVirtualPanels();
  }

  protected _createPanel(el: any, options: PanelOptions) {
    return new VirtualPanel(options);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null) {
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _removePanelElements(panels: Panel[]): this {
    return this;
  }

  private _resetPanelElementOrder() {
    const elements = this._elements;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const visiblePanels = [...flicking.visiblePanels].sort((panel1, panel2) => (panel1.position + panel1.offset) - (panel2.position + panel2.offset));
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

  private _updateVirtualPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const initialPanelCount = this._initialPanelCount;
    const align = this._getPanelAlign();
    const panels = this._panels;

    if (initialPanelCount > panels.length) {
      const firstIndex = panels.length;
      const newPanels = range(initialPanelCount - panels.length)
        .map(idx => new VirtualPanel({ flicking, index: firstIndex + idx, align }));

      panels.push(...newPanels);
    } else if (initialPanelCount < panels.length) {
      panels.splice(initialPanelCount);
    }
  }
}

export default VirtualRenderer;
