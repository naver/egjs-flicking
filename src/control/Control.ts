/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import Input from "~/control/Input";
import * as ERROR from "~/const/error";
import { DIRECTION, EVENTS } from "~/const/external";
import { Panel } from "~/core";

abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _input: Input;
  protected _activeIndex: number;

  public constructor() {
    this._flicking = null;
    this._input = new Input();
    this._activeIndex = 0;
  }

  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._input.init(flicking);
    this._activeIndex = 0;
    return this;
  }

  public destroy(): this {
    this._input.destroy();
    return this;
  }

  public getActiveIndex() { return this._activeIndex; }
  public isPlaying() { return this._input.getStateMachine().getState().playing; }

  public updateInputRange(range: { min: number; max: number }) {
    this._input.updateRange(range);
  }

  public async moveToPanel(panel: Panel, duration: number, force: boolean = false) {
    const flicking = this._flicking;

    if (!flicking) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    if (!force && flicking.isPlaying()) {
      return Promise.resolve();
    }

    const camera = flicking.getCamera();
    const eventSuccess = flicking.trigger(EVENTS.CHANGE, {
      index: panel.getIndex(),
      panel,
      isTrusted: false,
      direction: panel.getPosition() > camera.getPosition() ? DIRECTION.NEXT : DIRECTION.PREV
    });

    if (!eventSuccess) {
      return Promise.resolve();
    }

    if (flicking.isPlaying()) {
      this._input.stop();
    }

    return this._input.animateTo(panel.getPosition(), duration)
      .then(() => {
        this._activeIndex = panel.getIndex();
      });
  }

  public abstract moveToPosition(position: number, duration: number, force: boolean);
}

export default Control;
