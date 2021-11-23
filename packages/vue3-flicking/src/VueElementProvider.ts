/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ElementProvider } from "@egjs/flicking";

import VuePanel from "./VuePanel";

class VueElementProvider implements ElementProvider {
  private _el: VuePanel;
  private _cachedElement: HTMLElement;

  public get rendered() { return !this._el.hide; }
  public get element() {
    const el = this._el.$el.nextSibling as HTMLElement;

    if (el && el.nodeType === Node.ELEMENT_NODE) {
      this._cachedElement = el;
    }

    return this._cachedElement;
  }

  public constructor(el: VuePanel) {
    this._el = el;
  }

  public show() {
    this._el.hide = false;
  }

  public hide() {
    this._el.hide = true;
  }
}

export default VueElementProvider;
