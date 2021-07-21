import { ExternalRenderer } from "@egjs/flicking";

import SveltePanel from "./SveltePanel";

class SvelteRenderer extends ExternalRenderer {
  constructor(options) {
    super(options);

    this._sveltePanels = options.sveltePanels;
  }

  async render() {
    const strategy = this._renderingStrategy;
    const flicking = this._flicking;
    const panels = this._panels;

    if (!flicking) return;

    strategy.updateRenderingPanels(flicking);
    panels.forEach(panel => panel.render());

    return new Promise((resolve) => {
      resolve();
    });
  }

  async forceRenderAllPanels() {
    const panels = this._panels;

    panels.forEach(panel => panel.markForShow());
    panels.forEach(panel => panel.render());

    return new Promise((resolve) => {
      resolve();
    });
  }

  _collectPanels() {
    const align = this._getPanelAlign();
    const flicking = this._flicking;

    this._panels = this._sveltePanels.map((panelComponent, index) => new SveltePanel({
      flicking,
      index,
      align,
      externalComponent: panelComponent
    }));
  }

  _createPanel(externalComponent, options) {
    return new SveltePanel({ externalComponent, ...options });
  }
}

export default SvelteRenderer;
