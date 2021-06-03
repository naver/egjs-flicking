import { ExternalPanel } from "@egjs/flicking";

import NonStrictPanelComponent from "./NonStrictPanelComponent";

class ReactPanel extends ExternalPanel<NonStrictPanelComponent> {
  public get element() {
    return this._externalComponent.element as HTMLElement;
  }
  public get rendered() { return !this._externalComponent.hide; }

  public markForShow() {
    this._externalComponent.hide = false;
  }

  public markForHide() {
    this._externalComponent.hide = true;
  }
}

export default ReactPanel;
