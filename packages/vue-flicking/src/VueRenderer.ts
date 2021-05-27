import { ExternalRenderer, PanelOptions, RendererOptions } from "../../../src";

import VueFlicking from "./Flicking";
import VuePanel from "./VuePanel";
import VuePanelComponent from "./VuePanelComponent";

export interface VueRendererOptions extends RendererOptions {
  vueFlicking: VueFlicking;
}

class VueRenderer extends ExternalRenderer {
  // Internal States
  protected _vueFlicking: VueFlicking;

  public constructor(options: VueRendererOptions) {
    super(options);

    this._vueFlicking = options.vueFlicking;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const strategy = this._renderingStrategy;
    const flicking = this._flicking;

    if (!flicking) return;

    strategy.updateRenderingPanels(flicking);
    this._vueFlicking.$forceUpdate();

    return new Promise<void>((resolve) => {
      this._vueFlicking?.$once("render", resolve);
    });
  }

  public async forceRenderAllPanels() {
    this._panels.forEach(panel => panel.markForShow());
    this._vueFlicking.$forceUpdate();

    return new Promise<void>((resolve) => {
      this._vueFlicking?.$once("render", resolve);
    });
  }

  protected _collectPanels() {
    const align = this._getPanelAlign();
    const children = this._vueFlicking.$children as VuePanelComponent[];

    this._panels = children.map((panelComponent, index) => new VuePanel({
      flicking: this._flicking!,
      index,
      align,
      externalComponent: panelComponent
    }));
  }

  protected _createPanel(externalComponent: VuePanelComponent, options: PanelOptions) {
    return new VuePanel({ externalComponent, ...options });
  }
}

export default VueRenderer;
