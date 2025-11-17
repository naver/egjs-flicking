/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../../Flicking";

import ElementProvider from "./ElementProvider";

/**
 * @internal
 */
class VanillaElementProvider implements ElementProvider {
  private _element: HTMLElement;
  private _rendered: boolean;

  public get element() { return this._element; }
  public get rendered() { return this._rendered; }

  public constructor(element: HTMLElement) {
    this._element = element;
    this._rendered = true;
  }

  public show(flicking: Flicking): void {
    const el = this.element;
    const cameraEl = flicking.camera.element;

    if (el.parentElement !== cameraEl) {
      cameraEl.appendChild(el);
      this._rendered = true;
    }
  }

  public hide(flicking: Flicking): void {
    const el = this.element;
    const cameraEl = flicking.camera.element;

    if (el.parentElement === cameraEl) {
      cameraEl.removeChild(el);
      this._rendered = false;
    }
  }
}

export default VanillaElementProvider;
