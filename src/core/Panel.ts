/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import { parseAlign } from "~/utils";
import { ALIGN } from "~/const/external";
import { LiteralUnion, ValueOf } from "~/type/internal";

export interface PanelOption {
  el: HTMLElement;
  index: number;
  align: LiteralUnion<ValueOf<typeof ALIGN>> | number;
  flicking: Flicking;
}

class Panel {
  private _flicking: Flicking;
  private _el: HTMLElement;
  private _align: PanelOption["align"];

  private _index: number;
  private _size: { width: number; height: number };
  private _pos: { left: number; top: number };
  private _margin: { left: number; right: number; top: number; bottom: number };
  private _alignPos: number; // Actual align pos

  public constructor({
    el,
    index,
    align,
    flicking
  }: PanelOption) {
    this._el = el;
    this._index = index;
    this._flicking = flicking;

    this._align = align;

    this._size = { width: 0, height: 0 };
    this._pos = { left: 0, top: 0 };
    this._margin = { left: 0, right: 0, top: 0, bottom: 0 };
    this._alignPos = 0;
  }

  public destroy(): this {
    return this;
  }

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

  // Internal States Getter
  public getElement() { return this._el; }
  public getIndex() { return this._index; }
  public getSize() { return this._size; }
  public getPosition() { return (this._flicking.isHorizontal() ? this._pos.left : this._pos.top) + this._alignPos; }
  public getMargin() { return this._margin; }

  // Options Getter
  public getAlign() { return this._align; }

  // Options Getter
  public setAlign(val: PanelOption["align"]) { this._align = val; }

  public include(position: number): boolean {
    const pos = this._pos;
    const size = this._size;
    const margin = this._margin;
    const isHorizontal = this._flicking.isHorizontal();

    return isHorizontal
      ? (position >= pos.left - margin.left) && (position <= pos.left + size.width + margin.right)
      : (position >= pos.top - margin.top) && (position <= pos.top + size.height + margin.bottom);
  }

  public focus(duration?: number) {
    return this._flicking.moveTo(this._index, duration);
  }

  public prev(): Panel | null {
    const renderer = this._flicking.getRenderer();

    return renderer.getPanel(this._index - 1);
  }

  public next(): Panel | null {
    const renderer = this._flicking.getRenderer();

    return renderer.getPanel(this._index + 1);
  }

  private _updateAlignPos() {
    const size = this._size;
    this._alignPos = parseAlign(this._align, this._flicking.isHorizontal() ? size.width : size.height);
  }
}

export default Panel;
