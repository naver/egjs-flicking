import VirtualPanel from "../core/panel/VirtualPanel";

import VirtualElement from "./VirtualElement";

class VanillaVirtualElement implements VirtualElement {
  private _element: HTMLElement;
  private _index: number;
  private _renderingPanel: VirtualPanel | null;

  public get element() { return this._element; }
  public get index() { return this._index; }
  public get renderingPanel() { return this._renderingPanel; }

  public set renderingPanel(val: VirtualPanel | null) { this._renderingPanel = val; }

  public constructor({
    element,
    index,
    renderingPanel
  }: Omit<VirtualElement, "hide" | "show">) {
    this._element = element;
    this._index = index;
    this._renderingPanel = renderingPanel;
  }

  public show() {
    const el = this._element;

    if (el.style.display) {
      el.style.display = "";
    }
  }

  public hide() {
    const el = this._element;

    el.style.display = "none";
  }
}

export default VanillaVirtualElement;
