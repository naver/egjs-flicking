import { VirtualPanel, DIRECTION } from "@egjs/flicking";

class SvelteVirtualPanel extends VirtualPanel {
  render() {
    const toggleDirection = this._toggleDirection;
    const element = this.element;

    if (!element || !this.rendered) return;

    const flicking = this._flicking;
    const cachedInnerHTML = this._cachedInnerHTML

    element.innerHTML = cachedInnerHTML
      ? cachedInnerHTML
      : flicking.virtual.renderPanel(this, this.index);

    if (flicking.virtual.cache && !cachedInnerHTML) {
      this.cacheRenderResult(element.innerHTML);
    }

    const size = flicking.horizontal
      ? { width: `${this.size}px` }
      : { height: `${this.size}px` };

    this.setSize(size);

    const index = this._index;
    const panelCount = flicking.panelCount;

    if (this._toggled) {
      element.style.order = toggleDirection === DIRECTION.NEXT
        ? (index + panelCount).toString()
        : (index - panelCount).toString();
    } else {
      element.style.order = index.toString();
    }
  }
}

export default SvelteVirtualPanel;
