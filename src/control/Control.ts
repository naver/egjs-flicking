/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "~/Flicking";
import AxesController from "~/control/AxesController";
import { DIRECTION, EVENTS } from "~/const/external";
import { Panel } from "~/core";
import { requireFlicking } from "~/utils";

abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _controller: AxesController | null;
  protected _activeIndex: number;

  public constructor() {
    this._flicking = null;
    this._controller = null;
    this._activeIndex = 0;
  }

  public abstract moveToPosition(position: number, duration: number): Promise<void>;

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._controller = new AxesController(flicking);

    return this;
  }

  public destroy(): this {
    this._controller?.destroy();

    this._flicking = null;
    this._controller = null;
    this._activeIndex = 0;

    return this;
  }

  public getController() { return this._controller; }
  public getActiveIndex() { return this._activeIndex; }
  public isAnimating() { return this._controller?.getState().playing || false; }

  public enable(): this {
    this._controller?.enable();

    return this;
  }

  public disable(): this {
    this._controller?.disable();

    return this;
  }

  @requireFlicking("Control")
  public updateInput() {
    this._controller!.update();
  }

  @requireFlicking("Control")
  public async moveToPanel(panel: Panel, duration: number) {
    const flicking = this._flicking!;

    const camera = flicking.getCamera();

    const triggeringEvent = panel.getIndex() !== this._activeIndex ? EVENTS.CHANGE : EVENTS.RESTORE;

    const eventSuccess = flicking.trigger(triggeringEvent, {
      index: panel.getIndex(),
      panel,
      isTrusted: false,
      direction: panel.getPosition() > camera.getPosition() ? DIRECTION.NEXT : DIRECTION.PREV
    });

    if (!eventSuccess) {
      return Promise.resolve();
    }

    return this._controller!.animateTo(panel.getPosition(), duration)
      .then(() => {
        this._activeIndex = panel.getIndex();
      });
  }
}

export default Control;
