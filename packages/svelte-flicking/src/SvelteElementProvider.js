/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
class SvelteElementProvider {
  get element() { return this._el.nativeElement(); }
  get rendered() { return this._el.rendered(); }

  constructor(el) {
    this._el = el;
  }

  show() {
    this._el.show();
  }

  hide() {
    this._el.hide();
  }

  setOrder(val) {
    this._el.setOrder(val);
  }
}

export default SvelteElementProvider;
