/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import SvelteFlickingPanel from "./SvelteFlickingPanel";

class SvelteElementProvider {
  private _el: SvelteFlickingPanel;

  public get element() { return this._el.nativeElement(); }
  public get rendered() { return this._el.rendered(); }

  public constructor(el: SvelteFlickingPanel) {
    this._el = el;
  }

  public show() {
    this._el.show();
  }

  public hide() {
    this._el.hide();
  }

  public setOrder(val: number) {
    this._el.setOrder(val);
  }
}

export default SvelteElementProvider;
