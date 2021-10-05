import { ExternalPanel } from "@egjs/flicking";

import ReactPanelComponent from "./ReactPanelComponent";

class ReactPanel extends ExternalPanel<ReactPanelComponent> {
  public get element() {
    return this._externalComponent.element as HTMLElement;
  }
  public get rendered() { return this._externalComponent.rendered; }

  public markForShow() {
    this._externalComponent.show();
  }

  public markForHide() {
    this._externalComponent.hide();
  }
}

export default ReactPanel;
