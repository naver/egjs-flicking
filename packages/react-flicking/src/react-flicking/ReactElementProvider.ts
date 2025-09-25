/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ElementProvider } from "@egjs/flicking";
import StrictPanel from "./StrictPanel";
import NonStrictPanel from "./NonStrictPanel";
import React from "react";

class ReactElementProvider implements ElementProvider {
  private _el: StrictPanel;

  public get element() { return this._el?.nativeElement }
  public get rendered() { return this._el?.rendered; }

  public constructor(el: StrictPanel) {
    this._el = el;
  }

  public show() {
    this._el?.show();
  }

  public hide() {
    this._el?.hide();
  }
}

export default ReactElementProvider;
