/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Control from "~/control/Control";
import { EVENTS } from "~/const/external";
import { clamp, getDirection, getFlickingAttached } from "~/utils";

class FreeControl extends Control {
  public async moveToPosition(position: number, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");

    const camera = flicking.camera;
    const cameraRange = camera.range;
    const panel = flicking.renderer.getPanelFromPosition(
      clamp(position, cameraRange.min, cameraRange.max)
    );
    const activePanel = this._activePanel;

    const animate = () => this._controller.animateTo(position, duration, axesEvent);
    const updateActivePanel = () => {
      if (panel) {
        this._activePanel = panel;
      }
    };

    if (panel && panel !== activePanel) {
      const eventSuccess = flicking.trigger(EVENTS.CHANGE, {
        index: panel.index,
        panel,
        isTrusted: axesEvent?.isTrusted || false,
        direction: getDirection(activePanel?.position ?? camera.position, position)
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
