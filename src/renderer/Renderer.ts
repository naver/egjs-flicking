import Flicking, { FlickingOptions } from "~/Flicking";
import Panel from "~/core/Panel";
import { toArray } from "~/utils";
import * as OPTIONS from "~/const/option";

export interface RendererOption {
  align: FlickingOptions["align"];
}

abstract class Renderer {
  // Options
  protected _align: FlickingOptions["align"];

  // Internal States
  protected _flicking: Flicking;
  protected _panels: Panel[];

  public constructor({
    align = OPTIONS.ALIGN.PREV
  }: Partial<RendererOption> = {}) {
    this._align = align;
    this.collectPanels();
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;
  }

  public destroy(): this {
    return this;
  }

  public getPanels(): Panel[] {
    return this._panels;
  }

  public getPanel(index: number): Panel | null {
    return this._panels[index] || null;
  }

  public getPanelCount(): number {
    return this._panels.length;
  }

  public collectPanels(): this {
    const flicking = this._flicking;

    const cameraElement = flicking.getCamera().getElement();
    const cameraChilds = toArray(cameraElement.children);

    this._panels = cameraChilds.map(
      (el: HTMLElement, idx: number) => new Panel({
        flicking: this._flicking,
        element: el,
        index: idx
      })
    );
    return this;
  }

  public updatePanelSize(): this {
    this._panels.forEach(panel => panel.resize());
    return this;
  }
}

export default Renderer;
