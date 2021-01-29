import { ValueOf } from "~/type/internal";

// Flicking Element
class El {
  /**
   * Very Basic Structure of the Flicking
   *
   * @example
   * - Viewport
   *   - Camera
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 300px)
   *     - Panel (width: 100%, height: 300px)
   */
  public static get DEFAULT_STRUCTURE() {
    return El.viewport().add(
      El.camera().add(
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(300),
        El.panel().setWidth("100%").setHeight(300),
      ),
    );
  }

  public get el() { return this._el; }

  private _el: HTMLElement;

  public constructor(type: ValueOf<typeof EL_TYPE>) {
    this._el = document.createElement("div");
    this._el.classList.add(type);
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
    if (typeof width === "number") {
      this._el.style.width = `${width}px`;
    } else {
      this._el.style.width = width;
    }

    return this;
  }

  public setHeight(height: number | string) {
    if (typeof height === "number") {
      this._el.style.height = `${height}px`;
    } else {
      this._el.style.height = height;
    }
    return this;
  }
}

export default El;

export const EL_TYPE = {
  VIEWPORT: "flicking-viewport",
  CAMERA: "flicking-camera",
  PANEL: "flicking-panel"
};
