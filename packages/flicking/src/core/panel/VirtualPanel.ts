/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { DIRECTION } from "../../constants/values";
import { circulateIndex } from "../../utils";

import Panel, { PanelOptions } from "./Panel";
import VirtualElementProvider from "./provider/VirtualElementProvider";

/**
 * Options for creating a {@link VirtualPanel}
 */
export interface VirtualPanelOptions extends PanelOptions {
  /** A provider instance that returns the actual html element */
  elementProvider: VirtualElementProvider;
}

/**
 * A slide data component that holds information of a single HTMLElement
 */
class VirtualPanel extends Panel {
  protected _elProvider: VirtualElementProvider;
  protected _cachedInnerHTML: string | null;

  /**
   * `HTMLElement` that panel's referencing
   * @readonly
   */
  public get element(): HTMLElement {
    return this._elProvider.element;
  }

  /**
   * Cached innerHTML by the previous render function
   * @readonly
   */
  public get cachedInnerHTML(): string | null {
    return this._cachedInnerHTML;
  }

  /**
   * A number for indexing which element it will be rendered on
   * @readonly
   */
  public get elementIndex(): number {
    const flicking = this._flicking;
    const virtualElCount = flicking.panelsPerView + 1;
    const panelCount = flicking.panelCount;
    let index = this._index;

    if (this._toggled) {
      // To prevent element duplication
      index = this._toggleDirection === DIRECTION.NEXT ? index + panelCount : index - panelCount;
    }

    return circulateIndex(index, virtualElCount);
  }

  /**
   * @param options - {@link VirtualPanelOptions}
   */
  public constructor(options: VirtualPanelOptions) {
    super(options);

    options.elementProvider.init(this);
    this._elProvider = options.elementProvider;
    this._cachedInnerHTML = null;
  }

  public cacheRenderResult(result: string) {
    this._cachedInnerHTML = result;
  }

  public uncacheRenderResult() {
    this._cachedInnerHTML = null;
  }

  public render() {
    const flicking = this._flicking;
    const { renderPanel, cache } = flicking.virtual;

    const element = this._elProvider.element;
    const newInnerHTML = this._cachedInnerHTML || renderPanel(this, this._index);

    if (newInnerHTML === element.innerHTML) return;

    element.innerHTML = newInnerHTML;

    if (cache) {
      this.cacheRenderResult(newInnerHTML);
    }
  }

  public increaseIndex(val: number) {
    this.uncacheRenderResult();
    return super.increaseIndex(val);
  }

  public decreaseIndex(val: number) {
    this.uncacheRenderResult();
    return super.decreaseIndex(val);
  }
}

export default VirtualPanel;
