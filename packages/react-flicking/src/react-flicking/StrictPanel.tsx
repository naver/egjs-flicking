/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";

class StrictPanel extends React.Component<{ children?: React.ReactElement }> {
  private _hide: boolean = false;

  private _elRef: React.RefObject<HTMLElement> = React.createRef();

  public get nativeElement() { return this._elRef.current!; }
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

export default StrictPanel;
