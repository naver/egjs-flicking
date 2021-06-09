import * as React from "react";
import ReactPanelComponent from "./ReactPanelComponent";

class StrictPanelComponent extends React.Component implements ReactPanelComponent {
  public hide: boolean = false;

  private _elRef: React.RefObject<HTMLElement> = React.createRef();

  public get element() { return this._elRef.current!; }

  public render() {
    return this.hide
      ? <></>
      : this._getElement();
  }

  private _getElement() {
    return React.cloneElement(React.Children.only(this.props.children) as React.ReactElement, {
      ref: this._elRef
    });
  }
}

export default StrictPanelComponent;
