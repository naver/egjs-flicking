/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../Flicking";
import Panel, { PanelOptions } from "../../core/panel/Panel";
import ElementProvider from "../../core/panel/provider/ElementProvider";

export interface RenderingStrategyOptions {
  providerCtor: new (...args: any) => ElementProvider;
  panelCtor: new (options: PanelOptions) => Panel;
}

/**
 * @internal
 */
abstract class RenderingStrategy {
  protected _providerCtor: RenderingStrategyOptions["providerCtor"];
  protected _panelCtor: RenderingStrategyOptions["panelCtor"];

  public constructor({ providerCtor, panelCtor }: RenderingStrategyOptions) {
    this._providerCtor = providerCtor;
    this._panelCtor = panelCtor;
  }

  public abstract renderPanels(flicking: Flicking): void;
  public abstract getRenderingElementsByOrder(flicking: Flicking): HTMLElement[];
  public abstract updateRenderingPanels(flicking: Flicking): void;
  public abstract createPanel(
    element: any,
    options: Omit<PanelOptions, "elementProvider">
  ): Panel;

  public abstract collectPanels(
    flicking: Flicking,
    elements: any[]
  ): Panel[];

  protected _showOnlyVisiblePanels(flicking: Flicking) {
    const panels = flicking.renderer.panels;
    const camera = flicking.camera;

    const visibleIndexes = camera.visiblePanels.reduce((visibles, panel) => {
      visibles[panel.index] = true;
      return visibles;
    }, {});

    panels.forEach(panel => {
      if (panel.index in visibleIndexes || panel.loading) {
        panel.markForShow();
      } else if (!flicking.holding) {
        // During the input sequence,
        // Do not remove panel elements as it won't trigger touchend event.
        panel.markForHide();
      }
    });
  }
}

export default RenderingStrategy;
