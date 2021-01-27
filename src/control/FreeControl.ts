/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Control from "~/control/Control";
import { EVENTS } from "~/const/external";
import { getDirection, getFlickingAttached } from "~/utils";

class FreeControl extends Control {
  public async moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");

    const camera = flicking.getCamera();
    const panel = flicking.getRenderer().getPanelFromPosition(position);

    const animate = () => this._controller.animateTo(position, duration);
    const updateIndex = () => {
      if (panel) {
        this._activeIndex = panel.getIndex();
      }
    };

    if (panel && panel.getIndex() !== this._activeIndex) {
      const eventSuccess = flicking.trigger(EVENTS.CHANGE, {
        index: panel.getIndex(),
        panel,
        isTrusted: axesEvent?.isTrusted || false,
        direction: getDirection(camera.getPosition(), panel.getPosition())
      });

      if (!eventSuccess) {
        return Promise.resolve();
      }
    }

    if (duration === 0) {
      updateIndex();

      return animate();
    } else {
      return animate().then(updateIndex);
    }
  }
}

export default FreeControl;
