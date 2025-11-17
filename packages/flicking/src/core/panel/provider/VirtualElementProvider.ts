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
  private _panel: VirtualPanel;

  public get element() { return this._virtualElement.nativeElement; }
  public get rendered() { return this._virtualElement.visible; }

  private get _virtualElement() {
    const flicking = this._flicking;
    const elIndex = this._panel.elementIndex;
    const virtualElements = flicking.virtual.elements;

    return virtualElements[elIndex];
  }

  public constructor(flicking: Flicking) {
    this._flicking = flicking;
  }

  public init(panel: VirtualPanel) {
    this._panel = panel;
  }

  public show(): void {
    // DO_NOTHING
    // Actual element visibility is controlled by VirtualManager
  }

  public hide(): void {
    // DO_NOTHING
    // Actual element visibility is controlled by VirtualManager
  }
}

export default VirtualElementProvider;
