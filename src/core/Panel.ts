/*
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

  // Internal States Getter
  public get element() { return this._el; }
  public get index() { return this._index; }
  public get size() { return this._size; }
  public get bbox() { return { ...this._pos, right: this._pos.left + this._size.width, bottom: this._pos.top + this._size.height }; }
  public get position() { return (this._flicking.horizontal ? this._pos.left : this._pos.top) + this._alignPos; }
  public get margin() { return this._margin; }

  // Options Getter
  public get align() { return this._align; }

  // Options Getter
  public set align(val: PanelOption["align"]) { this._align = val; }

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

  public isRemoved(): boolean {
    return this._el.parentElement !== this._flicking.camera.element;
  }

  public includePosition(position: number): boolean {
    return this.includeRange(position, position);
  }

  public includeRange(min: number, max: number): boolean {
    const pos = this._pos;
    const size = this._size;
    const margin = this._margin;

    return this._flicking.horizontal
      ? (max >= pos.left - margin.left) && (min <= pos.left + size.width + margin.right)
      : (max >= pos.top - margin.top) && (min <= pos.top + size.height + margin.bottom);
  }

  public isReachable(): boolean {
    const cameraRange = this._flicking.camera.range;

    return this.includeRange(cameraRange.min, cameraRange.max);
  }

  public isVisible(): boolean {
    const flicking = this._flicking;

    const camera = flicking.camera;
    const viewportSize = flicking.viewport.size;

    const panelPosition = this.position;
    const panelBbox = this.bbox;
    const panelPrev = flicking.horizontal ? panelBbox.left : panelBbox.top;
    const panelNext = flicking.horizontal ? panelBbox.right : panelBbox.bottom;

    const cameraPosition = camera.position;
    const cameraSize = flicking.horizontal ? viewportSize.width : viewportSize.height;
    const cameraPrev = cameraPosition - camera.alignPosition;
    const cameraNext = cameraPrev + cameraSize;

    // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.
    return panelPosition < cameraPosition
      ? panelNext >= cameraPrev
      : panelPrev <= cameraNext;
  }

  public focus(duration?: number) {
    return this._flicking.moveTo(this._index, duration);
  }

  public prev(): Panel | null {
    const renderer = this._flicking.renderer;

    return renderer.getPanel(this._index - 1);
  }

  public next(): Panel | null {
    const renderer = this._flicking.renderer;

    return renderer.getPanel(this._index + 1);
  }

  public increaseIndex(val: number): this {
    this._index += Math.max(val, 0);
    return this;
  }

  public decreaseIndex(val: number): this {
    this._index -= Math.max(val, 0);
    return this;
  }

  private _updateAlignPos() {
    const size = this._size;
    this._alignPos = parseAlign(this._align, this._flicking.horizontal ? size.width : size.height);
  }
}

export default Panel;
