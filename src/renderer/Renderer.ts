import Flicking, { FlickingOption } from "~/Flicking";
import Panel from "~/core/Panel";
import { toArray } from "~/utils";
import { ALIGN } from "~/const/external";

export interface RendererOption {
  align: FlickingOption["align"];
}

abstract class Renderer {
  // Options
  protected _align: FlickingOption["align"];

  // Internal States
  protected _flicking: Flicking;
  protected _panels: Panel[];

  public constructor({
    align = ALIGN.PREV
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

    const align = this._getPanelAlign();

    this._panels = cameraChilds.map(
      (el: HTMLElement, idx: number) => new Panel({
        flicking: this._flicking,
        el: el,
        index: idx,
        align
      })
    );
    return this;
  }

  public updatePanelSize(): this {
    this._panels.forEach(panel => panel.resize());
    return this;
  }

  private _getPanelAlign() {
    const align = this._align;

    return typeof align === "object"
      ? (align as { anchor: string | number }).anchor
      : align;
  }
}

export default Renderer;
