/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import Panel from "~/core/Panel";
import AxesController from "~/control/AxesController";
import { EVENTS } from "~/const/external";
import * as ERROR from "~/const/error";
import { getDirection, getFlickingAttached } from "~/utils";

abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _controller: AxesController;
  protected _activePanel: Panel | null;

  public constructor() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activePanel = null;
  }

  public abstract moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>;

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._controller.init(flicking);

    return this;
  }

  public destroy(): this {
    this._controller.destroy();

    this._flicking = null;
    this._activePanel = null;

    return this;
  }

  public get controller() { return this._controller; }
  public get activeIndex() { return this._activePanel?.index ?? -1; }
  public get activePanel() { return this._activePanel; }
  public get animating() { return this._controller.state.animating; }
  public get holding() { return this._controller.state.holding; }

  public enable(): this {
    this._controller.enable();

    return this;
  }

  public disable(): this {
    this._controller.disable();

    return this;
  }

  public updateInput(): this {
    this._controller.update();

    return this;
  }

  public checkActivePanelIsRemoved(): this {
    if (this._activePanel?.isRemoved()) {
      this._activePanel = null;
    }

    return this;
  }

  public async moveToPanel(panel: Panel, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;

    const triggeringEvent = panel !== this._activePanel ? EVENTS.CHANGE : EVENTS.RESTORE;

    const eventSuccess = flicking.trigger(triggeringEvent, {
      index: panel.index,
      panel,
      isTrusted: axesEvent?.isTrusted || false,
      direction: getDirection(camera.position, panel.position)
    });

    if (!eventSuccess) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.STOP_CALLED_BY_USER, ERROR.CODE.STOP_CALLED_BY_USER));
    }

    const updateActivePanel = () => {
      this._activePanel = panel;
    };
    const animate = () => this._controller.animateTo(panel.position, duration, axesEvent);

    if (duration === 0) {
      updateActivePanel();
      return animate();
    } else {
      return animate().then(updateActivePanel);
    }
  }
}

export default Control;
