import * as React from "react";

class ReactPanelComponent extends React.Component {
  public hide: boolean = false;
  private _elRef = React.createRef();

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

interface ReactPanelComponent extends React.Component {}

export default ReactPanelComponent;
