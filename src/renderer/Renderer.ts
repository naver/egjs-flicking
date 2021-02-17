/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "~/Flicking";
import Panel from "~/core/Panel";
import { ALIGN } from "~/const/external";
import { ElementLike } from "~/type/external";

export interface RendererOptions {
  align: FlickingOptions["align"];
}

abstract class Renderer {
  // Internal States
  protected _flicking: Flicking | null;
  protected _panels: Panel[];

  // Options
  protected _align: FlickingOptions["align"];

  // Internal states Getter
  public get panels() { return this._panels; }
  public get panelCount() { return this._panels.length; }

  // Options Getter
  public get align() { return this._align; }

  // Options Setter
  public set align(val: FlickingOptions["align"]) {
    this._align = val;

    const panelAlign = this._getPanelAlign();
    this._panels.forEach(panel => { panel.align = panelAlign; });
  }

  public constructor({
    align = ALIGN.CENTER
  }: Partial<RendererOptions> = {}) {
    this._align = align;
    this._panels = [];
    this._flicking = null;
  }

  public abstract render(): this;
  public abstract insert(index: number, element: ElementLike | ElementLike[]): Panel[];
  public abstract remove(index: number, deleteCount: number): Panel[];
  public abstract movePanelElementsToStart(panels: Panel[]): this;
  public abstract movePanelElementsToEnd(panels: Panel[]): this;
  public abstract resetPanelElementOrder(): this;

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    return this;
  }

  public destroy(): void {
    this._flicking = null;
    this._panels = [];
  }

  public getPanel(index: number): Panel | null {
    return this._panels[index] || null;
  }

  public updatePanelSize(): this {
    this._panels.forEach(panel => panel.resize());
    return this;
  }

  protected _getPanelAlign() {
    const align = this._align;

    return typeof align === "object"
      ? (align as { panel: string | number }).panel
      : align;
  }
}

export default Renderer;
