import Camera from "~/camera/Camera";
import { getFlickingAttached } from "~/utils";

class LinearCamera extends Camera {
  public updateRange() {
    const flicking = getFlickingAttached(this._flicking, "Camera");
    const renderer = flicking.getRenderer();

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.getPanelCount() - 1);

    this._range = { min: firstPanel?.getPosition() ?? 0, max: lastPanel?.getPosition() ?? 0 };
    return this;
  }
}

export default LinearCamera;
