/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "../../../Flicking";
import VirtualPanel from "../VirtualPanel";

import ElementProvider from "./ElementProvider";

/**
 * @internal
 */
class VirtualElementProvider implements ElementProvider {
  private _flicking: Flicking;
  private _index: number;

  public get index() { return this._index; }
  public get element() {
    const flicking = this._flicking;
    const virtualElements = flicking.camera.children;
    const virtualPanel = flicking.panels[this._index] as VirtualPanel;
    const elIndex = virtualPanel.elementIndex;

    return virtualElements[elIndex];
  }

  public constructor(flicking: Flicking, index: number) {
    this._flicking = flicking;
    this._index = index;
  }

  public show(): void {
    const el = this.element;

    if (el.style.display) {
      el.style.display = "";
    }
  }

  public hide(): void {
    const el = this.element;

    el.style.display = "none";
  }
}

export default VirtualElementProvider;
