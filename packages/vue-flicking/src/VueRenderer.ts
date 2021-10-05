import { ExternalRenderer, getFlickingAttached, PanelOptions, parsePanelAlign, range, RendererOptions, VirtualPanel } from "@egjs/flicking";

import VueFlicking from "./Flicking";
import VirtualPanelComponent from "./VirtualPanelComponent";
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
    const flicking = this._flicking;
    const vueFlicking = this._vueFlicking;

    if (!flicking) return;

    this._updateRenderingPanels();
    this._renderVirtualPanels();

    vueFlicking.$forceUpdate();

    return new Promise<void>((resolve) => {
      vueFlicking.$once("render", resolve);
    });
  }

  public async forceRenderAllPanels() {
    this._panels.forEach(panel => panel.markForShow());
    this._vueFlicking.$forceUpdate();

    const virtualManager = this._virtualManager;

    if (virtualManager) {
      const elements = virtualManager.elements as VirtualPanelComponent[];

      elements.forEach(el => {
        el.show();
        el.renderingPanel = null;
      });
    }

    return new Promise<void>((resolve) => {
      this._vueFlicking.$once("render", resolve);
    });
  }

  protected _collectPanels() {
    const align = parsePanelAlign(this._align);
    const flicking = getFlickingAttached(this._flicking);
    const vueFlicking = this._vueFlicking;
    const virtualManager = this._virtualManager;

    if (virtualManager) {
      const children = vueFlicking.$children as VirtualPanelComponent[];

      virtualManager.updateElements(children);

      this._panels = range(virtualManager.initialPanelCount).map(index => new VirtualPanel({
        flicking,
        index,
        align
      }));
    } else {
      const children = vueFlicking.$children as VuePanelComponent[];

      this._panels = children.map((panelComponent, index) => new VuePanel({
        flicking,
        index,
        align,
        externalComponent: panelComponent
      }));
    }
  }

  protected _createPanel(externalComponent: VuePanelComponent, options: PanelOptions) {
    const virtual = this._virtualManager;

    return virtual
      ? new VirtualPanel(options)
      : new VuePanel({ externalComponent, ...options });
  }
}

export default VueRenderer;
