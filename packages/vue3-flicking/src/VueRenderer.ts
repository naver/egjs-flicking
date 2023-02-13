/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {
  ExternalRenderer,
  getFlickingAttached,
  PanelOptions,
  RendererOptions
} from "@egjs/flicking";

import VueFlicking from "./Flicking";
import VuePanel from "./VuePanel";

export interface VueRendererOptions extends RendererOptions {
  vueFlicking: VueFlicking;
}

class VueRenderer extends ExternalRenderer {
  // Internal States
  private _vueFlicking: VueFlicking;

  public constructor(options: VueRendererOptions) {
    super(options);

    this._vueFlicking = options.vueFlicking;
  }

  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const vueFlicking = this._vueFlicking;
    const strategy = this._strategy;

    strategy.updateRenderingPanels(flicking);
    strategy.renderPanels(flicking);

    return new Promise<void>((resolve) => {
      vueFlicking.renderEmitter.once("render", () => {
        this._afterRender();
        resolve();
      });
      vueFlicking.$forceUpdate();
    });
  }

  public async forceRenderAllPanels() {
    const vueFlicking = this._vueFlicking;

    await super.forceRenderAllPanels();

    return new Promise<void>((resolve) => {
      vueFlicking.renderEmitter.once("render", resolve);
      vueFlicking.$forceUpdate();
    });
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const vueFlicking = this._vueFlicking;
    const childRefs = vueFlicking.$refs;
    const vuePanels: any[] = Object.keys(childRefs).map(refKey => childRefs[refKey]);

    this._panels = this._strategy.collectPanels(flicking, vuePanels);
  }

  protected _createPanel(externalComponent: VuePanel, options: PanelOptions) {
    return this._strategy.createPanel(externalComponent, options);
  }
}

export default VueRenderer;
