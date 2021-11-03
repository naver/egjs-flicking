/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Renderer2 } from "@angular/core";
import {
  ExternalRenderer,
  getFlickingAttached,
  PanelOptions,
  RendererOptions
} from "@egjs/flicking";

import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";
import { NgxFlickingComponent } from "./ngx-flicking.component";

export interface NgxRendererOptions extends RendererOptions {
  ngxFlicking: NgxFlickingComponent;
  ngxRenderer: Renderer2;
}

class NgxRenderer extends ExternalRenderer {
  // Internal States
  private _ngxFlicking: NgxFlickingComponent;
  private _ngxRenderer: Renderer2;

  public constructor(options: NgxRendererOptions) {
    super(options);

    this._ngxFlicking = options.ngxFlicking;
    this._ngxRenderer = options.ngxRenderer;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async render() {
    const flicking = getFlickingAttached(this._flicking);
    const strategy = this._strategy;

    strategy.updateRenderingPanels(flicking);
    strategy.renderPanels(flicking);

    this._resetPanelElementOrder();
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const children = this._ngxFlicking.ngxPanels.toArray();

    this._panels = this._strategy.collectPanels(flicking, children);
  }

  protected _createPanel(externalComponent: NgxFlickingPanel, options: PanelOptions) {
    return this._strategy.createPanel(externalComponent, options);
  }

  private _resetPanelElementOrder() {
    const flicking = getFlickingAttached(this._flicking);
    const renderer = this._ngxRenderer;
    const cameraEl = flicking.camera.element;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedElements = this._strategy
      .getRenderingElementsByOrder(flicking)
      .reverse();

    reversedElements.forEach((el, idx) => {
      const nextEl = reversedElements[idx - 1] ? reversedElements[idx - 1] : null;

      if (el.nextElementSibling !== nextEl) {
        renderer.insertBefore(cameraEl, el, nextEl);
      }
    });
  }
}

export default NgxRenderer;
