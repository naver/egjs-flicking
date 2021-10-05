/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Renderer2 } from "@angular/core";
import { ExternalRenderer, getFlickingAttached, Panel, PanelOptions, parsePanelAlign, range, RendererOptions, VirtualPanel } from "@egjs/flicking";

import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";
import { NgxFlickingComponent } from "./ngx-flicking.component";
import NgxPanel from "./NgxPanel";
import NgxVirtualElement from "./NgxVirtualElement";
import NgxVirtualPanel from "./NgxVirtualPanel";

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
    const flicking = this._flicking!;
    const cameraEl = flicking.camera.element;
    const wasRenderedPanels = this._panels.filter(panel => panel.element.parentElement === cameraEl);

    this._updateRenderingPanels();
    const renderingPanels = this._getRenderingPanelsByOrder();

    this._unrenderPanelElements(wasRenderedPanels.filter(panel => !panel.rendered));
    this._renderPanelElements(renderingPanels.filter(panel => panel.element.parentElement !== cameraEl), null);
    this._renderVirtualElements();
    this._resetPanelElementOrder(renderingPanels);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async forceRenderAllPanels() {
    const flicking = this._flicking!;
    const renderer = this._ngxRenderer;
    const virtual = this._virtualManager;

    flicking.panels.forEach(panel => panel.markForShow());

    if (virtual) {
      virtual.elements.forEach(virtualEl => {
        virtualEl.show();
        virtualEl.renderingPanel = null;
      });
    } else {
      const camera = flicking.camera;
      const cameraElement = camera.element;
      const fragment = document.createDocumentFragment();

      this._panels.forEach(panel => renderer.appendChild(fragment, panel.element));

      renderer.appendChild(cameraElement, fragment);
    }
  }

  protected _collectPanels() {
    const flicking = getFlickingAttached(this._flicking);
    const align = parsePanelAlign(this._align);
    const ngxRenderer = this._ngxRenderer;
    const children = this._ngxFlicking.ngxPanels.toArray();

    const virtualManager = this._virtualManager;

    if (virtualManager) {
      const renderer = this._ngxRenderer;
      const panelsPerView = flicking.panelsPerView;
      const cameraElement = flicking.camera.element;
      const fragment = document.createDocumentFragment();

      const virtualElements = range(panelsPerView + 1).map(idx => {
        const panelEl = renderer.createElement("div");
        panelEl.className = virtualManager.panelClass;
        renderer.appendChild(fragment, panelEl);

        return new NgxVirtualElement({
          ngxRenderer,
          element: panelEl,
          index: idx,
          renderingPanel: null
        });
      });

      renderer.appendChild(cameraElement, fragment);
      virtualManager.updateElements(virtualElements);

      this._panels = range(virtualManager.initialPanelCount)
        .map(idx => new NgxVirtualPanel({ flicking, ngxRenderer, index: idx, align }));
    } else {
      this._panels = children.map((panelComponent, index) => new NgxPanel({
        flicking: this._flicking!,
        index,
        align,
        externalComponent: panelComponent
      }));
    }
  }

  protected _createPanel(externalComponent: NgxFlickingPanel, options: PanelOptions) {
    const virtual = this._virtualManager;
    const ngxRenderer = this._ngxRenderer;

    return virtual
      ? new NgxVirtualPanel({ ngxRenderer, ...options })
      : new NgxPanel({ externalComponent, ...options });
  }

  private _renderPanelElements(panels: Panel[], nextSibling: Panel | null) {
    if (this.virtualEnabled) return;

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
    if (this.virtualEnabled) return;

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
    const virtual = this._virtualManager;
    const cameraEl = flicking.camera.element;

    // We're using reversed panels here as last panel should be the last element of camera element
    const reversedPanels = virtual
      ? virtual.getVirtualElementsByOrder().reverse()
      : [...panels].reverse();

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

  private _renderVirtualElements() {
    if (!this.virtualEnabled) return;

    const flicking = getFlickingAttached(this._flicking);
    const virtual = this._virtualManager!;
    const { cache, renderPanel, elements } = virtual;
    const invisibles = elements.map((_, idx) => idx);
    const visiblePanels = flicking.visiblePanels as VirtualPanel[];

    visiblePanels.forEach(panel => {
      const virtualEl = panel.virtualElement;
      const el = virtualEl.element;

      invisibles[virtualEl.index] = -1;

      virtualEl.show();

      if (virtualEl.renderingPanel !== panel) {
        el.innerHTML = panel.cachedInnerHTML
          ? panel.cachedInnerHTML
          : renderPanel(panel, panel.index);

        if (cache) {
          panel.cacheRenderResult(el.innerHTML);
        }

        virtualEl.renderingPanel = panel;
      }
    });

    invisibles.filter(val => val >= 0)
      .forEach(idx => {
        const virtualEl = elements[idx];

        virtualEl.hide();
      });
  }
}

export default NgxRenderer;
