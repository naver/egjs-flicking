import { ExternalRenderer, PanelOptions, RendererOptions, parsePanelAlign, getFlickingAttached, range, VirtualPanel } from "@egjs/flicking";

import ReactFlicking from "./Flicking";
import ReactPanel from "./ReactPanel";
import NonStrictPanelComponent from "./NonStrictPanelComponent";
import VirtualPanelComponent from "./VirtualPanelComponent";

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
    const flicking = this._flicking;
    const reactFlicking = this._reactFlicking;

    if (!flicking || !reactFlicking.mounted) return;

    this._updateRenderingPanels();
    this._renderVirtualPanels();

    return new Promise<void>(resolve => {
      reactFlicking.setRenderCallback(resolve);
      reactFlicking.setState({});
    });
  }

  public async forceRenderAllPanels() {
    const reactFlicking = this._reactFlicking;
    const virtualManager = this._virtualManager;

    if (!reactFlicking.mounted) return;

    this._panels.forEach(panel => panel.markForShow());

    if (virtualManager) {
      const elements = virtualManager.elements as VirtualPanelComponent[];

      elements.forEach(el => {
        el.show();
        el.renderingPanel = null;
      });
    }

    return new Promise<void>(resolve => {
      reactFlicking.setRenderCallback(resolve);
      reactFlicking.setState({});
    });
  }

  protected _collectPanels() {
    const align = parsePanelAlign(this._align);
    const flicking = getFlickingAttached(this._flicking);
    const reactFlicking = this._reactFlicking;
    const reactPanels = reactFlicking.reactPanels;
    const virtualManager = this._virtualManager;

    if (virtualManager) {
      virtualManager.updateElements(reactPanels as VirtualPanelComponent[]);

      this._panels = range(reactFlicking.props.virtual!.initialPanelCount).map(index => new VirtualPanel({
        flicking,
        index,
        align
      }));
    } else {
      this._panels = reactPanels.map((panelComponent, index) => new ReactPanel({
        flicking,
        index,
        align,
        externalComponent: panelComponent
      }));
    }
  }

  protected _createPanel(externalComponent: NonStrictPanelComponent, options: PanelOptions) {
    const virtual = this._virtualManager;

    return virtual
      ? new VirtualPanel(options)
      : new ReactPanel({ externalComponent, ...options });
  }
}

export default ReactRenderer;
