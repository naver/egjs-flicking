import Camera from "./Camera";

class CircularCamera extends Camera {
  public updateRange() {
    const flicking = this._flicking;

    // const renderer = flicking.renderer;

    // this._range = { min: renderer.firstPanel?.position ?? 0, max: flicking.renderer.lastPanel?.position ?? 0 };
    return this;
  }
}

export default CircularCamera;
