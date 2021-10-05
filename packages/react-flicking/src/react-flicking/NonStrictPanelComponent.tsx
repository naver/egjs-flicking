import * as React from "react";
import { findDOMNode } from "react-dom";

import ReactPanelComponent from "./ReactPanelComponent";

class NonStrictPanelComponent extends React.Component implements ReactPanelComponent {
  private _hide: boolean = false;

  public get element() { return findDOMNode(this) as HTMLElement; }
  public get rendered() { return !this._hide; }

  public render() {
    return this._hide
      ? <></>
      : this.props.children;
  }

  public show() {
    this._hide = false;
  }

  public hide() {
    this._hide = true;
  }
}

export default NonStrictPanelComponent;
