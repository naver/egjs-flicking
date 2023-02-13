/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { getFlickingAttached, toArray } from "../utils";
import Panel, { PanelOptions } from "../core/panel/Panel";

import Renderer from "./Renderer";

/**
 *
 */
class VanillaRenderer extends Renderer {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const strategy = this._strategy;

    strategy.updateRenderingPanels(flicking);
    strategy.renderPanels(flicking);

    this._resetPanelElementOrder();
    this._afterRender();
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;

    this._removeAllTextNodes();
    this._panels = this._strategy.collectPanels(flicking, camera.children);
  }

  protected _createPanel(el: HTMLElement, options: Omit<PanelOptions, "elementProvider">): Panel {
    return this._strategy.createPanel(el, options);
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
