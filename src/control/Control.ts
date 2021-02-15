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

  public get controller() { return this._controller; }
  public get activeIndex() { return this._activePanel?.index ?? -1; }
  public get activePanel() { return this._activePanel; }
  public get animating() { return this._controller.state.animating; }
  public get holding() { return this._controller.state.holding; }

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

  public resetActivePanel(): this {
    this._activePanel = null;

    return this;
  }

  public async moveToPanel(panel: Panel, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.camera;

    if (!panel.isReachable()) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(panel.position), ERROR.CODE.POSITION_NOT_REACHABLE));
    }

    this._triggerIndexChangeEvent(panel, panel.position, axesEvent);

    const position = camera.clampToReachablePosition(panel.position);
    return this._animateToPosition({ position, duration, newActivePanel: panel, axesEvent });
  }

  protected _triggerIndexChangeEvent(panel: Panel, position: number, axesEvent?: OnRelease): boolean {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const triggeringEvent = panel !== this._activePanel ? EVENTS.CHANGE : EVENTS.RESTORE;
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const eventSuccess = flicking.trigger(triggeringEvent, {
      index: panel.index,
      panel,
      isTrusted: axesEvent?.isTrusted || false,
      direction: getDirection(activePanel?.position ?? camera.position, position)
    });

    if (!eventSuccess) {
      throw new FlickingError(ERROR.MESSAGE.STOP_CALLED_BY_USER, ERROR.CODE.STOP_CALLED_BY_USER);
    }

    return eventSuccess;
  }

  protected async _animateToPosition({
    position,
    duration,
    newActivePanel,
    axesEvent
  }: {
    position: number;
    duration: number;
    newActivePanel: Panel;
    axesEvent?: OnRelease;
  }) {
    const animate = () => this._controller.animateTo(position, duration, axesEvent);

    if (duration === 0) {
      this._setActivePanel(newActivePanel);
      return animate();
    } else {
      return animate().then(() => this._setActivePanel(newActivePanel));
    }
  }

  protected _setActivePanel = (panel: Panel) => {
    this._activePanel = panel;
  };
}

export default Control;
