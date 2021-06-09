import * as React from "react";
import { findDOMNode } from "react-dom";

import ReactPanelComponent from "./ReactPanelComponent";

class NonStrictPanelComponent extends React.Component implements ReactPanelComponent {
  public hide: boolean = false;

  public get element() { return findDOMNode(this) as HTMLElement; }

  public render() {
    return this.hide
      ? <></>
      : this.props.children;
  }
}

export default NonStrictPanelComponent;
