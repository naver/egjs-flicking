import { ExternalRenderer, parsePanelAlign, range } from "@egjs/flicking";

import SveltePanel from "./SveltePanel";
import SvelteVirtualPanel from "./SvelteVirtualPanel";

class SvelteRenderer extends ExternalRenderer {
  constructor(options) {
    super(options);

    this._sveltePanels = options.sveltePanels;
  }

  async render() {
    const flicking = this._flicking;
    const panels = this._panels;

    if (!flicking) return;

    this._updateRenderingPanels();
    this._renderVirtualPanels();

    if (this._virtualManager) {
      flicking.visiblePanels.forEach(panel => panel.render());
    } else {
      panels.forEach(panel => panel.render());
    }

    return new Promise((resolve) => {
      resolve();
    });
  }

  async forceRenderAllPanels() {
    const panels = this._panels;

    const virtualManager = this._virtualManager;

    if (virtualManager) {
      const elements = virtualManager.elements;

      elements.forEach(el => {
        el.show();
        el.renderingPanel = null;
      });
    }

    panels.forEach(panel => panel.markForShow());
    panels.forEach(panel => panel.render());

    return new Promise((resolve) => {
      resolve();
    });
  }

  _collectPanels() {
    const align = parsePanelAlign(this._align);
    const flicking = this._flicking;
    const virtualManager = this._virtualManager;

    if (virtualManager) {
      virtualManager.updateElements(this._sveltePanels);

      this._panels = range(virtualManager.initialPanelCount).map(index => new SvelteVirtualPanel({
        flicking,
        index,
        align
      }));
    } else {
      this._panels = this._sveltePanels.map((panelComponent, index) => new SveltePanel({
        flicking,
        index,
        align,
        externalComponent: panelComponent
      }));
    }
  }

  _createPanel(externalComponent, options) {
    const virtual = this._virtualManager;

    return virtual
      ? new SvelteVirtualPanel(options)
      : new SveltePanel({ externalComponent, ...options });
  }
}

export default SvelteRenderer;
