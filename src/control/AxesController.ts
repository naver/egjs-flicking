/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { PanInput, AxesEvents, OnRelease } from "@egjs/axes";

import Flicking from "~/Flicking";
import StateMachine from "~/control/StateMachine";
import { AXES_EVENT } from "~/const/internal";
import { parseBounce } from "~/utils";

class AxesController {
  private _flicking: Flicking;
  private _axes: Axes;
  private _panInput: PanInput;
  private _stateMachine: StateMachine;

  private _releaseContext: OnRelease | null;

  public constructor(flicking: Flicking) {
    this._flicking = flicking;
    this._axes = new Axes({
      flick: {
        range: [0, 0],
        circular: false,
        bounce: [0, 0]
      }
    }, {
      deceleration: flicking.getDeceleration(),
      interruptable: flicking.isInterruptable(),
      easing: flicking.getEasing()
    });
    this._panInput = new PanInput(flicking.getViewport().getElement(), {
      inputType: flicking.getInputType(),
      iOSEdgeSwipeThreshold: flicking.getIOSEdgeSwipeThreshold(),
      scale: flicking.isHorizontal() ? [-1, 0] : [0, -1]
    });

    this._stateMachine = new StateMachine();

    const axes = this._axes;

    axes.connect(flicking.isHorizontal() ? ["flick", ""] : ["", "flick"], this._panInput);

    for (const key in AXES_EVENT) {
      const eventType = AXES_EVENT[key] as keyof AxesEvents;

      axes.on(eventType, (e: AxesEvents[typeof eventType]) => {
        this._stateMachine.fire(eventType, {
          flicking,
          axesEvent: e
        });
      });
    }

    this._releaseContext = null;
  }

  public destroy() {
    this._axes.destroy();
    this._panInput.destroy();

    return this;
  }

  public getAxes() { return this._axes; }
  public getState() { return this._stateMachine.getState(); }
  public isEnabled() { return this._panInput.isEnable(); }

  public setReleaseContext(val: OnRelease | null) {
    this._releaseContext = val;
  }

  public enable(): this {
    this._panInput.enable();

    return this;
  }

  public disable(): this {
    this._panInput.disable();

    return this;
  }

  public update(): this {
    const axes = this._axes;
    const flicking = this._flicking;

    const viewportSize = flicking.getViewport().getSize();
    const cameraRange = flicking.getCamera().getRange();
    const axis = axes.axis.flick;

    axis.circular = flicking.isCircular();
    axis.range = [cameraRange.min, cameraRange.max];
    axis.bounce = parseBounce(flicking.getBounce(), flicking.isHorizontal() ? viewportSize.width : viewportSize.height);

    axes.setTo({ flick: flicking.getCamera().getPosition() }, 0);

    return this;
  }

  public animateTo(position: number, duration: number): Promise<void> {
    if (this._releaseContext) {
      this._releaseContext.setTo({ flick: position }, duration);
    } else {
      this._axes.setTo({ flick: position }, duration);
    }

    return new Promise(resolve => {
      this._axes.once(AXES_EVENT.FINISH, () => resolve());
    });
  }
}

export default AxesController;
