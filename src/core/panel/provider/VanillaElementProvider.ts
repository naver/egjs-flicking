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

  public get element() { return this._element; }

  public constructor(element: HTMLElement) {
    this._element = element;
  }

  public show(flicking: Flicking): void {
    const el = this.element;
    const cameraEl = flicking.camera.element;

    if (el.parentElement !== cameraEl) {
      cameraEl.appendChild(el);
    }
  }

  public hide(flicking: Flicking): void {
    const el = this.element;
    const cameraEl = flicking.camera.element;

    if (el.parentElement === cameraEl) {
      cameraEl.removeChild(el);
    }
  }
}

export default VanillaElementProvider;
