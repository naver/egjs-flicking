import { ExternalRenderer, PanelOptions, RendererOptions } from "@egjs/flicking";

import SveltePanel from "./SveltePanel";
import SveltePanelComponent from "./SveltePanelComponent";

export interface SvelteRendererOptions extends RendererOptions {
  sveltePanels: SveltePanelComponent[];
}

class SvelteRenderer extends ExternalRenderer {
  // Internal States
  private _sveltePanels: SvelteRendererOptions["sveltePanels"];

  public constructor(options: SvelteRendererOptions) {
    super(options);

    this._sveltePanels = options.sveltePanels;
  }

  public async render() {
    const strategy = this._renderingStrategy;
    const flicking = this._flicking;
    const panels = this._panels as SveltePanel[];

    if (!flicking) return;

    strategy.updateRenderingPanels(flicking);
    panels.forEach(panel => panel.render());

    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  public async forceRenderAllPanels() {
    const panels = this._panels as SveltePanel[];

    panels.forEach(panel => panel.markForShow());
    panels.forEach(panel => panel.render());

    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  protected _collectPanels() {
    const align = this._getPanelAlign();
    const flicking = this._flicking!;

    this._panels = this._sveltePanels.map((panelComponent, index) => new SveltePanel({
      flicking,
      index,
      align,
      externalComponent: panelComponent
    }));
  }

  protected _createPanel(externalComponent: SveltePanelComponent, options: PanelOptions) {
    return new SveltePanel({ externalComponent, ...options });
  }
}

export default SvelteRenderer;
