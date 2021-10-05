/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached, parsePanelAlign, range, toArray } from "../utils";
import Panel, { PanelOptions } from "../core/panel/Panel";
import ElementPanel from "../core/panel/ElementPanel";
import VirtualPanel from "../core/panel/VirtualPanel";

import Renderer from "./Renderer";
import VanillaVirtualElement from "./VanillaVirtualElement";

/**
 *
 */
class VanillaRenderer extends Renderer {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const cameraEl = flicking.camera.element;
    const wasRenderedPanels = this._panels.filter(panel => panel.element.parentElement === cameraEl);

    this._updateRenderingPanels();
    const renderingPanels = this._getRenderingPanelsByOrder();

    this._removePanelElements(wasRenderedPanels.filter(panel => !panel.rendered));
    this._insertPanelElements(renderingPanels.filter(panel => panel.element.parentElement !== cameraEl), null);
    this._renderVirtualElements();
    this._resetPanelElementOrder(renderingPanels);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const virtual = this._virtualManager;

    flicking.panels.forEach(panel => panel.markForShow());

    if (virtual) {
      virtual.elements.forEach(virtualEl => {
        virtualEl.show();
        virtualEl.renderingPanel = null;
      });
    } else {
      const fragment = document.createDocumentFragment();

      this._panels.forEach(panel => fragment.appendChild(panel.element));
      this._removeAllChildsFromCamera();

      cameraElement.appendChild(fragment);
    }
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const align = parsePanelAlign(this._align);
    const virtual = this._virtualManager;
    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    toArray(cameraElement.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });

    if (virtual) {
      const panelsPerView = flicking.panelsPerView;
      const fragment = document.createDocumentFragment();

      const virtualElements = range(panelsPerView + 1).map(idx => {
        const panelEl = document.createElement("div");
        panelEl.className = virtual.panelClass;
        fragment.appendChild(panelEl);

        return new VanillaVirtualElement({
          element: panelEl,
          index: idx,
          renderingPanel: null
        });
      });

      cameraElement.appendChild(fragment);
      virtual.updateElements(virtualElements);

      this._panels = virtual.generatePanels();
    } else {
      const cameraChilds = toArray(cameraElement.children);

      this._panels = cameraChilds.map(
        (el: HTMLElement, index: number) => new ElementPanel({ flicking, el, index, align })
      );
    }
  }

  protected _createPanel(el: HTMLElement, options: PanelOptions): Panel {
    const virtual = this._virtualManager;

    return virtual
      ? new VirtualPanel(options)
      : new ElementPanel({ el, ...options });
  }

  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null) {
    if (this.virtualEnabled) return;

    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);

    return this;
  }

  protected _removePanelElements(panels: Panel[]) {
    if (this.virtualEnabled) return;

    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });

    return;
  }

  private _renderVirtualElements() {
    if (!this.virtualEnabled) return;

    const flicking = getFlickingAttached(this._flicking);
    const virtual = this._virtualManager!;
    const { cache, renderPanel, elements } = virtual;
    const invisibles = elements.map((_, idx) => idx);
    const visiblePanels = flicking.visiblePanels as VirtualPanel[];

    visiblePanels.forEach(panel => {
      const virtualEl = panel.virtualElement;
      const el = virtualEl.element;

      invisibles[virtualEl.index] = -1;

      virtualEl.show();

      if (virtualEl.renderingPanel !== panel) {
        el.innerHTML = panel.cachedInnerHTML
          ? panel.cachedInnerHTML
          : renderPanel(panel, panel.index);

        if (cache) {
          panel.cacheRenderResult(el.innerHTML);
        }

        virtualEl.renderingPanel = panel;
      }
    });

    invisibles.filter(val => val >= 0)
      .forEach(idx => {
        const virtualEl = elements[idx];

        virtualEl.hide();
      });
  }

  private _resetPanelElementOrder(panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const cameraEl = flicking.camera.element;

    const virtual = this._virtualManager;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedPanels = virtual
      ? virtual.getVirtualElementsByOrder().reverse()
      : [...panels].reverse();

    reversedPanels.forEach((panel, idx) => {
      const nextPanel = reversedPanels[idx - 1];
      const nextPanelEl = nextPanel ? nextPanel.element : null;

      if (panel.element.nextElementSibling !== nextPanelEl) {
        cameraEl.insertBefore(panel.element, nextPanelEl);
      }
    });
  }

  private _getRenderingPanelsByOrder(): Panel[] {
    const flicking = getFlickingAttached(this._flicking);
    const panels = flicking.renderer.panels;

    return panels.filter(panel => panel.rendered)
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));
  }
}

export default VanillaRenderer;
