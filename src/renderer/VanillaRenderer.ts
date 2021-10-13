/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../Flicking";
import { getFlickingAttached, toArray } from "../utils";
import Panel, { PanelOptions } from "../core/panel/Panel";

import Renderer from "./Renderer";

/**
 *
 */
class VanillaRenderer extends Renderer {
  public init(flicking: Flicking): this {
    super.init(flicking);

    this._removeAllTextNodes();

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const strategy = this._strategy;
    const cameraEl = flicking.camera.element;
    const wasRenderedPanels = this._panels
      .filter(panel => panel.element.parentElement === cameraEl)
      .filter(panel => !panel.rendered);
    const notRenderedPanels = this._panels
      .filter(panel => panel.element.parentElement !== cameraEl)
      .filter(panel => panel.rendered);

    strategy.updateRenderingPanels(flicking);

    // TODO: Move this to strategy, virtual elements shouldn't be deleted
    this._removePanelElements(wasRenderedPanels);
    this._insertPanelElements(notRenderedPanels);
    //

    strategy.renderPanels(flicking);
    this._resetPanelElementOrder();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const virtual = flicking.virtual;

    this._panels.forEach(panel => panel.markForShow());

    // TODO: Move this to strategy
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
    const camera = flicking.camera;

    this._removeAllTextNodes();
    this._strategy.collectPanels(flicking, camera.children);
  }

  protected _createPanel(el: HTMLElement, options: Omit<PanelOptions, "elementProvider">): Panel {
    return this._strategy.createPanel(el, options);
  }

  protected _insertPanelElements(panels: Panel[], nextSibling: Panel | null = null) {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => fragment.appendChild(panel.element));
    cameraElement.insertBefore(fragment, nextSiblingElement);
  }

  protected _removePanelElements(panels: Panel[]) {
    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    panels.forEach(panel => {
      cameraElement.removeChild(panel.element);
    });
  }

  private _resetPanelElementOrder() {
    const flicking = getFlickingAttached(this._flicking);
    const cameraEl = flicking.camera.element;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedElements = this._strategy
      .getRenderingElementsByOrder(flicking)
      .reverse();

    reversedElements.forEach((el, idx) => {
      const nextEl = reversedElements[idx - 1] ? reversedElements[idx - 1] : null;

      if (el.nextElementSibling !== nextEl) {
        cameraEl.insertBefore(el, nextEl);
      }
    });
  }

  private _removeAllTextNodes() {
    const flicking = getFlickingAttached(this._flicking);
    const cameraElement = flicking.camera.element;

    // Remove all text nodes in the camera element
    toArray(cameraElement.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });
  }
}

export default VanillaRenderer;
