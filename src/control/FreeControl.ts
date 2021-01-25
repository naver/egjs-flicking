/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Control from "~/control/Control";
import { getFlickingAttached } from "~/utils";

class FreeControl extends Control {
  public moveToPosition(position: number, duration: number) {
    const flicking = getFlickingAttached(this._flicking, "Control");

    return this._controller.animateTo(position, duration)
      .then(() => {
        const panel = flicking.getCamera().getPanelBelow();

        if (panel) {
          this._activeIndex = panel.getIndex();
        }
      });
  }
}

export default FreeControl;
