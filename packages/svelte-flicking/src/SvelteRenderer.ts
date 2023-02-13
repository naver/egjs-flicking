/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Component from "@egjs/component";
import { ExternalRenderer, getFlickingAttached, PanelOptions, RendererOptions } from "@egjs/flicking";

import SvelteFlickingPanel from "./SvelteFlickingPanel";
import SvelteElementProvider from "./SvelteElementProvider";

export interface SvelteRendererOptions extends RendererOptions {
  getSlots(children: HTMLElement[]): SvelteFlickingPanel[];
  renderEmitter: Component<{ render: void }>;
  forceUpdate(): void;
}

class SvelteRenderer extends ExternalRenderer {
  private _getSlots: SvelteRendererOptions["getSlots"];
  private _renderEmitter: SvelteRendererOptions["renderEmitter"];
  private _forceUpdate: SvelteRendererOptions["forceUpdate"];

  public constructor(options: SvelteRendererOptions) {
    super(options);

    this._getSlots = options.getSlots;
    this._renderEmitter = options.renderEmitter;
    this._forceUpdate = options.forceUpdate;
  }

  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const strategy = this._strategy;

    strategy.updateRenderingPanels(flicking);
    strategy.renderPanels(flicking);

    return new Promise<void>(resolve => {
      this._renderEmitter.once("render", () => {
        this._afterRender();
        resolve();
      });
      this._applyPanelOrder();
      this._forceUpdate();
    });
  }

  public async forceRenderAllPanels() {
    await super.forceRenderAllPanels();

    return new Promise<void>(resolve => {
      this._renderEmitter.once("render", resolve);
      this._forceUpdate();
    });
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const panelComponents = this._getSlots(flicking.camera.children);

    this._panels = this._strategy.collectPanels(flicking, panelComponents);
  }

  protected _createPanel(externalComponent: SvelteFlickingPanel, options: PanelOptions) {
    return this._strategy.createPanel(externalComponent, options);
  }

  private _applyPanelOrder() {
    const flicking = getFlickingAttached(this._flicking);
    const panels = this._panels;
    const renderingIndexes = this._strategy.getRenderingIndexesByOrder(flicking);

    if (!flicking.virtualEnabled) {
      renderingIndexes.forEach((panelIndex, idx) => {
        const panel = panels[panelIndex];

        (panel.elementProvider as SvelteElementProvider).setOrder(idx);
      });
    } else {
      renderingIndexes.forEach((panelIndex, idx) => {
        const panel = panels[panelIndex];

        panel.element.style.order = idx.toString();
      });
    }
  }
}

export default SvelteRenderer;
