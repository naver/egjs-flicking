import Flicking from "~/Flicking";
import Panel from "~/core/Panel";
import { toArray } from "~/utils";
import * as OPTIONS from "~/const/option";
import { LiteralUnion, ValueOf } from "~/types";

export interface RendererOption {
  align: LiteralUnion<ValueOf<typeof OPTIONS.ALIGN>> | number;
}

abstract class Renderer {
  // Options
  protected _align: RendererOption["align"];

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

  public render(): this {
    const gap = this._flicking.options.gap;
    const panelManager = this._panelManager;

    const firstPanel = panelManager.getFirstPanel();
    const panels = panelManager.getPanels();

    if (!firstPanel) {
      return this;
    }

    let nextPanelPos = 0;

    panels.forEach(panel => {
      const newPosition = nextPanelPos;
      const panelSize = panel.getSize();

      panel.relocate(newPosition);
      nextPanelPos += panelSize + gap;
    });

    return this;
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
