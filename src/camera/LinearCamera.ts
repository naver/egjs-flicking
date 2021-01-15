import Camera from "./Camera";

class LinearCamera extends Camera {
  public updateRange() {
    const flicking = this._flicking;
    const renderer = flicking.getRenderer();

    this._range = { min: renderer.firstPanel?.getAnchorPosition() ?? 0, max: renderer.lastPanel?.getAnchorPosition() ?? 0 };
    return this;
  }
}

export default LinearCamera;
