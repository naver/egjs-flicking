/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ElementProvider } from "@egjs/flicking";
import StrictPanel from "./StrictPanel";
import NonStrictPanel from "./NonStrictPanel";

class ReactElementProvider implements ElementProvider {
  private _elRef: React.RefObject<HTMLElement>;

  public get element() { return this._elRef.current!; }
  public get rendered() { return this._elRef.current !== null; }

  public constructor(el: StrictPanel | NonStrictPanel | HTMLDivElement) {
    this._elRef = el instanceof HTMLDivElement ? { current: el } : el.elRef;
  }

  public show() {
    if (this._elRef.current) {
      this._elRef.current.style.display = "";
    }
  }

  public hide() {
    if (this._elRef.current) {
      this._elRef.current.style.display = "none";
    }
  }
}

export default ReactElementProvider;
