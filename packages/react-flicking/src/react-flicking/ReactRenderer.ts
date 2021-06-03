import { ExternalRenderer, PanelOptions, RendererOptions } from "@egjs/flicking";

import ReactFlicking from "./Flicking";
import ReactPanel from "./ReactPanel";
import NonStrictPanelComponent from "./NonStrictPanelComponent";

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
    const strategy = this._renderingStrategy;
    const flicking = this._flicking;
    const reactFlicking = this._reactFlicking;

    if (!flicking || !reactFlicking.mounted) return;

    strategy.updateRenderingPanels(flicking);

    return new Promise<void>(resolve => {
      reactFlicking.setRenderCallback(resolve);
      reactFlicking.setState({});
    });
  }

  public async forceRenderAllPanels() {
    const reactFlicking = this._reactFlicking;

    if (!reactFlicking.mounted) return;

    this._panels.forEach(panel => panel.markForShow());

    return new Promise<void>(resolve => {
      reactFlicking.setRenderCallback(resolve);
      reactFlicking.setState({});
    });
  }

  protected _collectPanels() {
    const align = this._getPanelAlign();
    const children = this._reactFlicking.reactPanels;

    this._panels = children.map((panelComponent, index) => new ReactPanel({
      flicking: this._flicking!,
      index,
      align,
      externalComponent: panelComponent
    }));
  }

  protected _createPanel(externalComponent: NonStrictPanelComponent, options: PanelOptions) {
    return new ReactPanel({ externalComponent, ...options });
  }
}

export default ReactRenderer;
