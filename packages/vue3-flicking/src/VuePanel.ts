import { ExternalPanel } from "@egjs/flicking";

import VuePanelComponent from "./VuePanelComponent";

class VuePanel extends ExternalPanel<VuePanelComponent> {
  public get element() {
    return (this._externalComponent.$.subTree.children as any)[0].el as HTMLElement;
  }

  public get rendered() { return !this._externalComponent.hide; }

  public markForShow() {
    this._externalComponent.hide = false;
  }

  public markForHide() {
    this._externalComponent.hide = true;
  }
}

export default VuePanel;
