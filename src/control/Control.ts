/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";

import Flicking from "~/Flicking";
import AxesController from "~/control/AxesController";
import { EVENTS } from "~/const/external";
import { Panel } from "~/core";
import { getDirection, getFlickingAttached } from "~/utils";

abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _controller: AxesController;
  protected _activeIndex: number;

  public constructor() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activeIndex = 0;
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
    this._activeIndex = 0;

    return this;
  }

  public getController() { return this._controller; }
  public getActiveIndex() { return this._activeIndex; }
  public isAnimating() { return this._controller.getState().playing; }

  public enable(): this {
    this._controller.enable();

    return this;
  }

  public disable(): this {
    this._controller.disable();

    return this;
  }

  public updateInput() {
    this._controller.update();
  }

  public async moveToPanel(panel: Panel, duration: number, axesEvent?: OnRelease) {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const camera = flicking.getCamera();

    const triggeringEvent = panel.getIndex() !== this._activeIndex ? EVENTS.CHANGE : EVENTS.RESTORE;

    const eventSuccess = flicking.trigger(triggeringEvent, {
      index: panel.getIndex(),
      panel,
      isTrusted: axesEvent?.isTrusted || false,
      direction: getDirection(camera.getPosition(), panel.getPosition())
    });

    if (!eventSuccess) {
      // TODO: Add new error type that shows it rejected by user stop()
      return Promise.reject();
    }

    const updateIndex = () => {
      this._activeIndex = panel.getIndex();
    };
    const animate = () => this._controller.animateTo(panel.getPosition(), duration, axesEvent);

    if (duration === 0) {
      updateIndex();
      return animate();
    } else {
      return animate().then(updateIndex);
    }
  }
}

export default Control;
