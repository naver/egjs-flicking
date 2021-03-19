/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import { parseAlign } from "~/utils";
import { ALIGN } from "~/const/external";
import { LiteralUnion, ValueOf } from "~/type/internal";

export interface PanelOptions {
  index: number;
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number;
  flicking: Flicking;
  el: HTMLElement;
}

class Panel {
  private _flicking: Flicking;
  private _el: HTMLElement;
  private _align: PanelOptions["align"];

  // Internal States
  private _index: number;
  private _pos: number;
  private _size: number;
  private _height: number;
  private _margin: { prev: number; next: number };
  private _alignPos: number; // Actual align pos
  private _offset: number;
  private _removed: boolean;

  // Internal States Getter
  public get element() { return this._el; }
  public get index() { return this._index; }
  public get position() { return this._pos + this._alignPos; }
  public get size() { return this._size; }
  public get sizeIncludingMargin() { return this._size + this._margin.prev + this._margin.next; }
  public get height() { return this._height; }
  public get margin() { return this._margin; }
  public get alignPosition() { return this._alignPos; }
  public get offset() { return this._offset; }
  public get removed() { return this._removed; }
  public get range() { return { min: this._pos, max: this._pos + this._size }; }

  // Options Getter
  public get align() { return this._align; }

  // Options Getter
  public set align(val: PanelOptions["align"]) { this._align = val; }

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

    this._removed = false;
    this._resetInternalStates();
  }

  public resize(): this {
    const el = this._el;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const elStyle = window.getComputedStyle(el) || (el as any).currentStyle as CSSStyleDeclaration;
    const flicking = this._flicking;
    const horizontal = flicking.horizontal;
    const prevPanel = flicking.renderer.panels[this._index - 1];

    this._size = horizontal ? el.offsetWidth : el.offsetHeight;
    this._margin = horizontal
      ? {
        prev: parseFloat(elStyle.marginLeft),
        next: parseFloat(elStyle.marginRight)
      } : {
        prev: parseFloat(elStyle.marginTop),
        next: parseFloat(elStyle.marginBottom)
      };

    this._pos = prevPanel
      ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev
      : this._margin.prev;

    this._height = horizontal ? el.offsetHeight : this._size;

    this._updateAlignPos();

    return this;
  }

  public contains(element: HTMLElement): boolean {
    return this._el.contains(element);
  }

  public destroy(): void {
    this._resetInternalStates();
    this._removed = true;
  }

  public includePosition(pos: number, includeMargin: boolean = false): boolean {
    return this.includeRange(pos, pos, includeMargin);
  }

  public includeRange(min: number, max: number, includeMargin: boolean = false): boolean {
    const margin = this._margin;
    const panelRange = this.range;

    if (includeMargin) {
      panelRange.min -= margin.prev;
      panelRange.max += margin.next;
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

  public increasePosition(val: number): this {
    this._moveBy(Math.max(val, 0));
    return this;
  }

  public decreasePosition(val: number): this {
    this._moveBy(-Math.max(val, 0));
    return this;
  }

  public increaseOffset(val: number): this {
    this._offset += Math.max(val, 0);
    return this;
  }

  public decreaseOffset(val: number): this {
    this._offset -= Math.max(val, 0);
    return this;
  }

  public resetOffset(): this {
    this._offset = 0;
    return this;
  }

  private _moveBy(val: number): this {
    this._pos += val;

    return this;
  }

  private _updateAlignPos() {
    this._alignPos = parseAlign(this._align, this._size);
  }

  private _resetInternalStates() {
    this._size = 0;
    this._pos = 0;
    this._margin = { prev: 0, next: 0 };
    this._height = 0;
    this._alignPos = 0;
    this._offset = 0;
  }
}

export default Panel;
