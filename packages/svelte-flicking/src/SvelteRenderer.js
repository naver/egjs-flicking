/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ExternalRenderer, getFlickingAttached } from "@egjs/flicking";

class SvelteRenderer extends ExternalRenderer {
  constructor(options) {
    super(options);

    this._getSlots = options.getSlots;
    this._renderEmitter = options.renderEmitter;
    this._forceUpdate = options.forceUpdate;
  }

  async render() {
    const flicking = getFlickingAttached(this._flicking);
    const strategy = this._strategy;

    strategy.updateRenderingPanels(flicking);
    strategy.renderPanels(flicking);

    return new Promise(resolve => {
      this._renderEmitter.once("render", resolve);
      this._applyPanelOrder();
      this._forceUpdate();
    });
  }

  async forceRenderAllPanels() {
    await super.forceRenderAllPanels();

    return new Promise(resolve => {
      this._renderEmitter.once("render", resolve);
      this._forceUpdate();
    });
  }

  _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const panelComponents = this._getSlots(flicking.camera.children);

    this._panels = this._strategy.collectPanels(flicking, panelComponents);
  }

  _createPanel(externalComponent, options) {
    return this._strategy.createPanel(externalComponent, options);
  }

  _applyPanelOrder() {
    const flicking = getFlickingAttached(this._flicking);
    const panels = this._panels;
    const renderingIndexes = this._strategy.getRenderingIndexesByOrder(flicking);

    if (!flicking.virtualEnabled) {
      renderingIndexes.forEach((panelIndex, idx) => {
        const panel = panels[panelIndex];

        panel.elementProvider.setOrder(idx);
      });
    } else {
      renderingIndexes.forEach((panelIndex, idx) => {
        const panel = panels[panelIndex];

        panel.element.style.order = idx;
      });
    }
  }
}

export default SvelteRenderer;
