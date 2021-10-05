import { Renderer2 } from "@angular/core";
import { isString, PanelOptions, VirtualPanel } from "@egjs/flicking";

export interface NgxVirtualPanelOptions extends PanelOptions {
  ngxRenderer: Renderer2;
}

class NgxVirtualPanel extends VirtualPanel {
  private _ngxRenderer: Renderer2;

  public constructor(options: NgxVirtualPanelOptions) {
    super(options);

    this._ngxRenderer = options.ngxRenderer;
  }

  public setSize({
    width,
    height
  }: Partial<{
    width: number | string;
    height: number | string;
  }>): this {
    const el = this.element;

    if (width != null) {
      const newWidth = isString(width) ? width : `${width}px`;

      this._ngxRenderer.setStyle(el, "width", newWidth);
    }
    if (height != null) {
      const newHeight = isString(height) ? height : `${height}px`;

      this._ngxRenderer.setStyle(el, "height", newHeight);
    }

    return this;
  }
}

export default NgxVirtualPanel;
