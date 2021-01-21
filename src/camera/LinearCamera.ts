import Camera from "~/camera/Camera";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";

class LinearCamera extends Camera {
  public updateRange() {
    const flicking = this._flicking;

    if (!flicking) {
      throw new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Camera"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
    }

    const renderer = flicking.getRenderer();

    const firstPanel = renderer.getPanel(0);
    const lastPanel = renderer.getPanel(renderer.getPanelCount() - 1);

    this._range = { min: firstPanel?.getPosition() ?? 0, max: lastPanel?.getPosition() ?? 0 };
    return this;
  }
}

export default LinearCamera;
