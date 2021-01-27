import { ValueOf } from "~/type/internal";
import { parseCSSSizeValue } from "~/utils";

// Flicking Element
class El {
  /**
   * Very Basic Structure of the Flicking
   *
   * @example
   * - Viewport (width: 1000px)
   *   - Camera
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 300px)
   */
  public static get DEFAULT_STRUCTURE() {
    return El.viewport().setWidth(1000).add(
      El.camera().add(
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(300),
      ),
    );
  }

  public static viewport() {
    return new El(EL_TYPE.VIEWPORT);
  }

  public static camera() {
    return new El(EL_TYPE.CAMERA);
  }

  public static panel(width?: string, height?: string) {
    const el = new El(EL_TYPE.PANEL);
    if (width) {
      el.setWidth(width);
    }
    if (height) {
      el.setHeight(height);
    }
    return el;
  }

  public get el() { return this._el; }

  private _el: HTMLElement;

  public constructor(type: ValueOf<typeof EL_TYPE>) {
    this._el = document.createElement("div");
    this._el.classList.add(type);
  }

  public add(...els: El[]) {
    els.forEach(el => {
      this._el.appendChild(el._el);
    });
    return this;
  }

  public appendTo(element: HTMLElement) {
    element.appendChild(this._el);
    return this;
  }

  public setWidth(width: number | string) {
    this._el.style.width = parseCSSSizeValue(width);

    return this;
  }

  public setHeight(height: number | string) {
    this._el.style.height = parseCSSSizeValue(height);

    return this;
  }

  public setMargin(values: Partial<{
    top: number | string;
    left: number | string;
    bottom: number | string;
    right: number | string;
  }>) {
    Object.keys(values).forEach(key => {
      this._el.style[`margin${key.charAt(0).toUpperCase() + key.slice(1)}`] = parseCSSSizeValue(values[key]);
    });

    return this;
  }
}

export default El;

export const EL_TYPE = {
  VIEWPORT: "flicking-viewport",
  CAMERA: "flicking-camera",
  PANEL: "flicking-panel"
};
