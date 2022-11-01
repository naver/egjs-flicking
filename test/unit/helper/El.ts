import { parseCSSSizeValue } from "~/utils";
import { range } from "./test-util";

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
   * Basic structure of the horizontal Flicking with 50% width panels
   * @example
   * - Viewport (width: 1000px, height: 100%)
   *   - Camera
   *     - Panel (width: 50%, height: 300px)
   *     - Panel (width: 50%, height: 300px)
   *     - Panel (width: 50%, height: 300px)
   */
  public static get HALF_HORIZONTAL() {
    return El.viewport("1000px", "100%").add(
      El.camera().add(
        El.panel().setWidth("50%").setHeight(300),
        El.panel().setWidth("50%").setHeight(300),
        El.panel().setWidth("50%").setHeight(300),
      ),
    );
  }

  /**
   * Horizontal Flicking using Panels with various heights
   * @example
   * - Viewport (width: 1000px, height: 100%)
   *   - Camera
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 400px)
   *     - Panel (width: 100%, height: 500px)
   *     - Panel (width: 100%, height: 600px)
   *     - Panel (width: 100%, height: 300px)
   */
  public static get VARIOUS_HORIZONTAL() {
    return El.viewport("1000px", "100%").add(
      El.camera().add(
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(400),
        El.panel().setWidth("100%").setHeight(500),
        El.panel().setWidth("100%").setHeight(600),
        El.panel().setWidth("100%").setHeight(300),
      ),
    );
  }

  /**
   * Very basic structure of the horizontal Flicking with n panels
   * @example
   * - Viewport (width: 1000px, height: 100%)
   *   - Camera
   *     - Panel (width: 100%, height: 300px) * n
   */
  public static DEFAULT_HORIZONTAL_WITH_PANELS(n: number) {
    return El.viewport("1000px", "100%").add(
      El.camera().add(
        ...range(n).map(() => El.panel().setWidth("100%").setHeight(300))
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
    return El.viewport("1000px", "1000px").addClass(EL_CLASS.VERTICAL).add(
      El.camera().add(
        El.panel("100%", "100%"),
        El.panel("100%", "100%"),
        El.panel("100%", "100%"),
      ),
    );
  }

  /**
   * Structure with no panels in it
   * @example
   * - Viewport (width: 1000px, height: 1000px)
   *   - Camera
   */
  public static get EMPTY() {
    return El.viewport("1000px", "1000px").add(
      El.camera()
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

  public static imgPanel(width?: string, height?: string) {
    const el = new El(EL_CLASS.PANEL);
    if (width) {
      el.setWidth(width);
    }
    if (height) {
      el.setHeight(height);
    }

    const img = document.createElement("img");

    img.style.width = "100%";
    img.style.height = "100%";
    // use random placeholder
    img.src = `https://picsum.photos/200/200?hash=${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`;

    el._el.appendChild(img);

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
