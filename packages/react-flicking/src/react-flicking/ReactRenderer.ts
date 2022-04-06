/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ExternalRenderer, PanelOptions, RendererOptions, getFlickingAttached } from "@egjs/flicking";

import ReactFlicking from "./Flicking";
import StrictPanel from "./StrictPanel";
import NonStrictPanel from "./NonStrictPanel";

export interface ReactRendererOptions extends RendererOptions {
  reactFlicking: ReactFlicking;
}

class ReactRenderer extends ExternalRenderer {
  // Internal States
  protected _reactFlicking: ReactFlicking;

  public constructor(options: ReactRendererOptions) {
    super(options);

    this._reactFlicking = options.reactFlicking;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const reactFlicking = this._reactFlicking;
    const strategy = this._strategy;

    this._rendering = true;

    strategy.updateRenderingPanels(flicking);
    strategy.renderPanels(flicking);

    return new Promise<void>(resolve => {
      reactFlicking.renderEmitter.once("render", () => {
        this._rendering = false;
        resolve()
      });
      reactFlicking.forceUpdate();
    });
  }

  public async forceRenderAllPanels() {
    const reactFlicking = this._reactFlicking;

    this._rendering = true;
    await super.forceRenderAllPanels();

    return new Promise<void>(resolve => {
      reactFlicking.renderEmitter.once("render", () => {
        this._rendering = false;
        resolve();
      });
      reactFlicking.forceUpdate();
    });
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const reactFlicking = this._reactFlicking;
    const reactPanels = reactFlicking.reactPanels;

    this._panels = this._strategy.collectPanels(flicking, reactPanels);
  }

  protected _createPanel(externalComponent: StrictPanel | NonStrictPanel | HTMLDivElement, options: PanelOptions) {
    return this._strategy.createPanel(externalComponent, options);
  }
}

export default ReactRenderer;
