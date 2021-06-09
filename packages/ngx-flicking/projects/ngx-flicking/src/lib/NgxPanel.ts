import { ExternalPanel } from "@egjs/flicking";

import { NgxFlickingPanel } from "./ngx-flicking-panel.directive";

class NgxPanel extends ExternalPanel<NgxFlickingPanel> {
  public get element() { return this._externalComponent.element as HTMLElement; }
  public get rendered() { return this._externalComponent.visible; }

  public markForShow() {
    this._externalComponent.show();
  }

  public markForHide() {
    this._externalComponent.hide();
  }
}

export default NgxPanel;
