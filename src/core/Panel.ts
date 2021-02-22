/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import { parseAlign } from "~/utils";
import { ALIGN } from "~/const/external";
import { LiteralUnion, ValueOf } from "~/type/internal";

export interface PanelOptions {
  el: HTMLElement;
  index: number;
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number;
  flicking: Flicking;
}

class Panel {
  private _flicking: Flicking;
  private _el: HTMLElement;
  private _align: PanelOptions["align"];

  private _index: number;
  private _size: { width: number; height: number };
  private _pos: { left: number; top: number };
  private _margin: { left: number; right: number; top: number; bottom: number };
  private _alignPos: number; // Actual align pos
  private _offset: number;

  public constructor({
    el,
    index,
    align,
    flicking
  }: PanelOptions) {
    this._el = el;
    this._index = index;
    this._flicking = flicking;

    this._align = align;

    this._size = { width: 0, height: 0 };
    this._pos = { left: 0, top: 0 };
    this._margin = { left: 0, right: 0, top: 0, bottom: 0 };
    this._alignPos = 0;
    this._offset = 0;
  }

  // Internal States Getter
  public get element() { return this._el; }
  public get index() { return this._index; }
  public get bbox() { return { ...this._pos, ...this._size }; }
  public get position() { return (this._flicking.horizontal ? this._pos.left : this._pos.top) + this._alignPos; }
  public get size() { return this._flicking.horizontal ? this._size.width : this._size.height; }
  public get margin() { return this._margin; }
  public get alignPosition() { return this._alignPos; }
  public get offset() { return this._offset; }
  public get range() {
    const pos = this._pos;
    const size = this._size;
    return this._flicking.horizontal
      ? { min: pos.left, max: pos.left + size.width }
      : { min: pos.top, max: pos.top + size.height };
  }

  // Options Getter
  public get align() { return this._align; }

  // Options Getter
  public set align(val: PanelOptions["align"]) { this._align = val; }

  public resize(): this {
    const el = this._el;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const elStyle = window.getComputedStyle(el) || (el as any).currentStyle as CSSStyleDeclaration;

    this._size = {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
    this._pos = {
      left: el.offsetLeft,
      top: el.offsetTop
    };
    this._margin = {
      left: parseFloat(elStyle.marginLeft),
      right: parseFloat(elStyle.marginRight),
      top: parseFloat(elStyle.marginTop),
      bottom: parseFloat(elStyle.marginBottom)
    };

    this._updateAlignPos();

    return this;
  }

  public includePosition(pos: number, includeMargin: boolean = false): boolean {
    return this.includeRange(pos, pos, includeMargin);
  }

  public includeRange(min: number, max: number, includeMargin: boolean = false): boolean {
    const margin = this._margin;
    const isHorizontal = this._flicking.horizontal;
    const panelRange = this.range;

    if (includeMargin) {
      panelRange.min -= isHorizontal ? margin.left : margin.top;
      panelRange.max += isHorizontal ? margin.right : margin.bottom;
    }

    return max >= panelRange.min && min <= panelRange.max;
  }

  public focus(duration?: number) {
    return this._flicking.moveTo(this._index, duration);
  }

  public prev(): Panel | null {
    const index = this._index;
    const flicking = this._flicking;
    const renderer = flicking.renderer;
    const panelCount = renderer.panelCount;

    if (panelCount === 1) return null;

    return flicking.circularEnabled
      ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1)
      : renderer.getPanel(index - 1);
  }

  public next(): Panel | null {
    const index = this._index;
    const flicking = this._flicking;
    const renderer = flicking.renderer;
    const panelCount = renderer.panelCount;

    if (panelCount === 1) return null;

    return flicking.circularEnabled
      ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1)
      : renderer.getPanel(index + 1);
  }

  public increaseIndex(val: number): this {
    this._index += Math.max(val, 0);
    return this;
  }

  public decreaseIndex(val: number): this {
    this._index -= Math.max(val, 0);
    return this;
  }

  public increaseOffset(val: number): this {
    this._offset += val;
    return this;
  }

  public decreaseOffset(val: number): this {
    this._offset -= val;
    return this;
  }

  public resetOffset(): this {
    this._offset = 0;
    return this;
  }

  private _updateAlignPos() {
    const size = this._size;
    this._alignPos = parseAlign(this._align, this._flicking.horizontal ? size.width : size.height);
  }
}

export default Panel;
