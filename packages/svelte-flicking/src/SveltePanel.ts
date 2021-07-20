import { DIRECTION, ExternalPanel } from "@egjs/flicking";

import SveltePanelComponent from "./SveltePanelComponent";

class SveltePanel extends ExternalPanel<SveltePanelComponent> {
  public get element() { return this._externalComponent.element(); }

  public get rendered() { return !this._externalComponent.hidden(); }

  public render() {
    if (!this._flicking.circularEnabled) return;

    const toggleDirection = this._toggleDirection;
    const element = this.element;

    if (!element) return;

    this.element.style.order = toggleDirection === DIRECTION.NONE || !this._toggled
      ? "0"
      : toggleDirection === DIRECTION.NEXT
        ? "1"
        : "-1";
  }

  public markForShow() {
    this._externalComponent.show();
  }

  public markForHide() {
    this._externalComponent.hide();
  }
}

export default SveltePanel;
