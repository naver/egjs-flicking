/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { ElementProvider } from "@egjs/flicking";

import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";

class NgxElementProvider implements ElementProvider {
  private _el: NgxFlickingPanel;

  public get element() { return this._el.nativeElement; }
  public get rendered() { return this._el.rendered; }

  public constructor(el: NgxFlickingPanel) {
    this._el = el;
  }

  public show(flicking: Flicking) {
    this._el.show(flicking);
  }

  public hide(flicking: Flicking) {
    this._el.hide(flicking);
  }
}

export default NgxElementProvider;
