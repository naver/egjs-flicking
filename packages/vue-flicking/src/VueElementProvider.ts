/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ElementProvider } from "@egjs/flicking";

import VuePanel from "./VuePanel";

class VueElementProvider implements ElementProvider {
  private _el: VuePanel;

  public get element() { return this._el.getElement(); }
  public get rendered() { return !this._el.hide; }

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
