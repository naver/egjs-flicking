/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached, toArray } from "../utils";
import Panel, { PanelOptions } from "../core/panel/Panel";
import ElementPanel from "../core/panel/ElementPanel";

import Renderer from "./Renderer";

/**
 *
 */
class VanillaRenderer extends Renderer {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const strategy = this._renderingStrategy;
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraEl = flicking.camera.element;
    const wasRenderedPanels = this._panels.filter(panel => panel.element.parentElement === cameraEl);

    strategy.updateRenderingPanels(flicking);
    const renderingPanels = this._getRenderingPanelsByOrder();

    this._removePanelElements(wasRenderedPanels.filter(panel => !panel.rendered));
    this._insertPanelElements(renderingPanels.filter(panel => panel.element.parentElement !== cameraEl), null);
    this._resetPanelElementOrder(renderingPanels);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const fragment = document.createDocumentFragment();

    this._panels.forEach(panel => fragment.appendChild(panel.element));

    this._removeAllChildsFromCamera();

    cameraElement.appendChild(fragment);
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");

    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    toArray(cameraElement.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });

    const align = this._getPanelAlign();
    const cameraChilds = toArray(cameraElement.children);

    this._panels = cameraChilds.map(
      (el: HTMLElement, index: number) => new ElementPanel({ flicking, el, index, align })
    );
  }

  protected _createPanel(el: HTMLElement, options: PanelOptions): ElementPanel {
    return new ElementPanel({ el, ...options });
  }

  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);

    return this;
  }

  protected _removePanelElements(panels: Panel[]): this {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });

    return this;
  }

  private _resetPanelElementOrder(panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraEl = flicking.camera.element;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedPanels = [...panels].reverse();
    reversedPanels.forEach((panel, idx) => {
      const nextPanel = reversedPanels[idx - 1];
      const nextPanelEl = nextPanel ? nextPanel.element : null;

      if (panel.element.nextElementSibling !== nextPanelEl) {
        cameraEl.insertBefore(panel.element, nextPanelEl);
      }
    });
  }

  private _removeAllChildsFromCamera() {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const cameraElement = flicking.camera.element;

    // Remove other elements
    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  }

  private _getRenderingPanelsByOrder(): Panel[] {
    const flicking = getFlickingAttached(this._flicking, "Renderer");
    const panels = flicking.renderer.panels;

    return panels.filter(panel => panel.rendered)
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));
  }
}

export default VanillaRenderer;
