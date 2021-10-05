import { Renderer2 } from "@angular/core";
import { VirtualElement, VirtualPanel } from "@egjs/flicking";

class NgxVirtualElement implements VirtualElement {
  private _element: HTMLElement;
  private _index: number;
  private _renderingPanel: VirtualPanel | null;
  private _ngxRenderer: Renderer2;

  public get element() { return this._element; }
  public get index() { return this._index; }
  public get renderingPanel() { return this._renderingPanel; }

  public set renderingPanel(val: VirtualPanel | null) { this._renderingPanel = val; }

  public constructor({
    element,
    index,
    renderingPanel,
    ngxRenderer
  }: Omit<VirtualElement, "hide" | "show"> & { ngxRenderer: Renderer2 }) {
    this._element = element;
    this._index = index;
    this._renderingPanel = renderingPanel;
    this._ngxRenderer = ngxRenderer;
  }

  public show() {
    const el = this._element;

    this._ngxRenderer.removeStyle(el, "display");
  }

  public hide() {
    const el = this._element;

    this._ngxRenderer.setStyle(el, "display", "none");
  }
}

export default NgxVirtualElement;
