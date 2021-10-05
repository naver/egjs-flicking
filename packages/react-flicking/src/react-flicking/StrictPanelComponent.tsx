import * as React from "react";
import ReactPanelComponent from "./ReactPanelComponent";

class StrictPanelComponent extends React.Component implements ReactPanelComponent {
  private _hide: boolean = false;

  private _elRef: React.RefObject<HTMLElement> = React.createRef();

  public get element() { return this._elRef.current!; }
  public get rendered() { return !this._hide; }

  public render() {
    return this._hide
      ? <></>
      : this._getElement();
  }

  public show() {
    this._hide = false;
  }

  public hide() {
    this._hide = true;
  }

  private _getElement() {
    return React.cloneElement(React.Children.only(this.props.children) as React.ReactElement, {
      ref: this._elRef
    });
  }
}

export default StrictPanelComponent;
