/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as React from "react";
import { findDOMNode } from "react-dom";

class NonStrictPanel extends React.Component<{ children?: React.ReactElement }> {
  private _hide: boolean = false;

  public get nativeElement() { return findDOMNode(this) as HTMLElement; }
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

export default NonStrictPanel;
