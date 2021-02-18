/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import Renderer, { RendererOptions } from "~/renderer/Renderer";
import { ElementLike } from "~/type/external";
import Panel from "~/core/Panel";

export interface ExternalRendererOptions extends RendererOptions {
  actualRenderer: Renderer;
}

class ExternalRenderer implements Renderer {
  // Internal States
  private _actualRenderer: Renderer;

  public get panels() { return this._actualRenderer.panels; }
  public get panelCount() { return this._actualRenderer.panels.length; }

  public constructor(options: ExternalRendererOptions) {
    this._actualRenderer = options.actualRenderer;
  }

  public init(flicking: Flicking): this {
    this._actualRenderer.init(flicking);

    return this;
  }

  public destroy(): void {
    this._actualRenderer.destroy();
  }

  public render(): this {
    this._actualRenderer.render();
    return this;
  }

  public getPanel(index: number): Panel | null {
    return this._actualRenderer.getPanel(index);
  }

  public updatePanelSize(): this {
    this._actualRenderer.updatePanelSize();
    return this;
  }

  public insert(index: number, element: ElementLike | ElementLike[]): Panel[] {
    return [];
  }

  public remove(index: number, deleteCount: number): Panel[] {
    return [];
  }

  public movePanelElementsToStart(panels: Panel[]): this {
    return this;
  }

  public movePanelElementsToEnd(panels: Panel[]): this {
    return this;
  }

  public resetPanelElementOrder(): this {
    return this;
  }
}

export default ExternalRenderer;
