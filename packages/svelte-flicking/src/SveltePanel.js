import { DIRECTION, ExternalPanel } from "@egjs/flicking";

class SveltePanel extends ExternalPanel {
  get element() { return this._externalComponent.element(); }

  get rendered() { return !this._externalComponent.hidden(); }

  render() {
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

  markForShow() {
    this._externalComponent.show();
  }

  markForHide() {
    this._externalComponent.hide();
  }
}

export default SveltePanel;
