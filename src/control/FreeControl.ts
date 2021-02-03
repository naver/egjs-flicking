/*
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

    const camera = flicking.camera;
    const panel = flicking.renderer.getPanelFromPosition(position);

    const animate = () => this._controller.animateTo(position, duration);
    const updateActivePanel = () => {
      if (panel) {
        this._activePanel = panel;
      }
    };

    if (panel && panel !== this._activePanel) {
      const eventSuccess = flicking.trigger(EVENTS.CHANGE, {
        index: panel.index,
        panel,
        isTrusted: axesEvent?.isTrusted || false,
        direction: getDirection(camera.position, panel.position)
      });

      if (!eventSuccess) {
        return Promise.resolve();
      }
    }

    if (duration === 0) {
      updateActivePanel();

      return animate();
    } else {
      return animate().then(updateActivePanel);
    }
  }
}

export default FreeControl;
