import { VirtualElement, VirtualPanel } from "@egjs/flicking";
import * as React from "react";
import ReactPanelComponent from "./ReactPanelComponent";

class VirtualPanelComponent extends React.Component<{
  index: number;
  className: string;
  size: { width: number } | { height: number } | {};
  innerHTML: string | null;
}> implements ReactPanelComponent, VirtualElement {
  public renderingPanel: VirtualPanel | null = null;

  private _hide: boolean = false;
  private _elRef: React.RefObject<HTMLDivElement> = React.createRef();

  public get index() { return this.props.index; }
  public get element() { return this._elRef.current!; }
  public get rendered() { return !this._hide; }

  public render() {
    const renderingPanel = this.renderingPanel;
    const innerHTML = this.props.innerHTML;

    if (renderingPanel && !renderingPanel.cachedInnerHTML && innerHTML) {
      renderingPanel.cacheRenderResult(innerHTML);
    }

    return this._hide
      ? <></>
      : <div ref={this._elRef} className={this.props.className} style={this.props.size} dangerouslySetInnerHTML={{ __html: innerHTML ?? "" }}></div>;
  }

  public show() {
    this._hide = false;
  }

  public hide() {
    this._hide = true;
  }
}

export default VirtualPanelComponent;
