/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Panel, { PanelOptions } from "~/core/Panel";

export interface ElementPanelOptions extends PanelOptions {
  el: HTMLElement;
}

class ElementPanel extends Panel {
  private _el: HTMLElement;

  public constructor(options: ElementPanelOptions) {
    super(options);

    const { el } = options;

    this._el = el;
  }

  // Internal States Getter
  public get element() { return this._el; }

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

  public contains(element: HTMLElement): boolean {
    return this._el.contains(element);
  }

  public prev(): ElementPanel | null {
    return super.prev() as ElementPanel | null;
  }

  public next(): ElementPanel | null {
    return super.next() as ElementPanel | null;
  }
}

export default ElementPanel;
