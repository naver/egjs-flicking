import { Renderer2 } from "@angular/core";
import { ExternalRenderer, Panel, PanelOptions, RendererOptions } from "@egjs/flicking";

import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";
import { NgxFlickingComponent } from "./ngx-flicking.component";
import NgxPanel from "./NgxPanel";

export interface NgxRendererOptions extends RendererOptions {
  ngxFlicking: NgxFlickingComponent;
  ngxRenderer: Renderer2;
}

class NgxRenderer extends ExternalRenderer {
  // Internal States
  protected _ngxFlicking: NgxFlickingComponent;
  private _ngxRenderer: Renderer2;

  public constructor(options: NgxRendererOptions) {
    super(options);

    this._ngxFlicking = options.ngxFlicking;
    this._ngxRenderer = options.ngxRenderer;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const strategy = this._renderingStrategy;
    const flicking = this._flicking!;
    const cameraEl = flicking.camera.element;
    const wasRenderedPanels = this._panels.filter(panel => panel.element.parentElement === cameraEl);

    strategy.updateRenderingPanels(flicking);
    const renderingPanels = this._getRenderingPanelsByOrder();

    this._unrenderPanelElements(wasRenderedPanels.filter(panel => !panel.rendered));
    this._renderPanelElements(renderingPanels.filter(panel => panel.element.parentElement !== cameraEl), null);
    this._resetPanelElementOrder(renderingPanels);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {
    const flicking = this._flicking!;
    const renderer = this._ngxRenderer;
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const fragment = document.createDocumentFragment();

    this._panels.forEach(panel => renderer.appendChild(fragment, panel.element));

    renderer.appendChild(cameraElement, fragment);
  }

  protected _collectPanels() {
    const align = this._getPanelAlign();
    const children = this._ngxFlicking.ngxPanels.toArray();

    this._panels = children.map((panelComponent, index) => new NgxPanel({
      flicking: this._flicking!,
      index,
      align,
      externalComponent: panelComponent
    }));
  }

  protected _createPanel(externalComponent: NgxFlickingPanel, options: PanelOptions) {
    return new NgxPanel({ externalComponent, ...options });
  }

  private _renderPanelElements(panels: Panel[], nextSibling: Panel | null) {
    const flicking = this._flicking!;
    const renderer = this._ngxRenderer;
    const camera = flicking.camera;
    const cameraElement = camera.element;
    const nextSiblingElement = nextSibling?.element || null;
    const fragment = document.createDocumentFragment();

    panels.forEach(panel => renderer.appendChild(fragment, panel.element));
    renderer.insertBefore(cameraElement, fragment, nextSiblingElement);

    return this;
  }

  private _unrenderPanelElements(panels: Panel[]): this {
    const flicking = this._flicking!;
    const renderer = this._ngxRenderer;
    const cameraElement = flicking.camera.element;

    panels
      .filter(panel => panel.element.parentElement === cameraElement)
      .forEach(panel => {
        renderer.removeChild(cameraElement, panel.element);
      });

    return this;
  }

  private _resetPanelElementOrder(panels: Panel[]) {
    const flicking = this._flicking!;
    const renderer = this._ngxRenderer;
    const cameraEl = flicking.camera.element;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedPanels = [...panels].reverse();
    reversedPanels.forEach((panel, idx) => {
      const nextPanel = reversedPanels[idx - 1];
      const nextPanelEl = nextPanel ? nextPanel.element : null;

      if (panel.element.nextElementSibling !== nextPanelEl) {
        renderer.insertBefore(cameraEl, panel.element, nextPanelEl);
      }
    });
  }

  private _getRenderingPanelsByOrder(): Panel[] {
    const flicking = this._flicking!;
    const panels = flicking.renderer.panels;

    return panels.filter(panel => panel.rendered)
      .sort((a, b) => (a.position + a.offset) - (b.position + b.offset));
  }
}

export default NgxRenderer;
