import { parseCSSSizeValue } from "~/utils";

export const EL_CLASS = {
  VIEWPORT: "flicking-viewport",
  CAMERA: "flicking-camera",
  PANEL: "flicking-panel",
  VERTICAL: "vertical"
} as const;


// Flicking Element
class El {
  /**
   * Very basic structure of the horizontal Flicking
   * @example
   * - Viewport (width: 1000px, height: 100%)
   *   - Camera
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 300px)
   */
  public static get DEFAULT_HORIZONTAL() {
    return El.viewport("1000px", "100%").add(
      El.camera().add(
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(300),
      ),
    );
  }

  /**
   * Very basic structure of the vertical Flicking
   * @example
   * - Viewport (width: 1000px, height: 1000px)
   *   - Camera
   *     - Panel (width: 100%, height: 100%)
   *     - Panel (width: 100%, height: 100%)
   *     - Panel (width: 100%, height: 100%)
   */
  public static get DEFAULT_VERTICAL() {
    return El.viewport().setHeight(1000).addClass(EL_CLASS.VERTICAL).add(
      El.camera().add(
        El.panel("100%", "100%"),
        El.panel("100%", "100%"),
        El.panel("100%", "100%"),
      ),
    );
  }

  public static viewport(width?: string, height?: string) {
    const el = new El(EL_CLASS.VIEWPORT);
    if (width) {
      el.setWidth(width);
    }
    if (height) {
      el.setHeight(height);
    }
    return el;
  }

  public static camera(width?: string, height?: string) {
    const el = new El(EL_CLASS.CAMERA);
    if (width) {
      el.setWidth(width);
    }
    if (height) {
      el.setHeight(height);
    }
    return el;
  }

  public static panel(width?: string, height?: string) {
    const el = new El(EL_CLASS.PANEL);
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

  public constructor(type: string) {
    this._el = document.createElement("div");
    this._el.classList.add(type);
  }

  public add(...els: El[]) {
    els.forEach(el => {
      this._el.appendChild(el._el);
    });
    return this;
  }

  public addClass(...classNames: string[]) {
    this._el.classList.add(...classNames);
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
