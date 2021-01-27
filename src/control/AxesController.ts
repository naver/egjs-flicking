/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { PanInput, AxesEvents, OnRelease } from "@egjs/axes";

import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import StateMachine from "~/control/StateMachine";
import { AXES_EVENT } from "~/const/internal";
import * as ERROR from "~/const/error";
import { getFlickingAttached, parseBounce } from "~/utils";

class AxesController {
  private _flicking: Flicking | null;
  private _axes: Axes | null;
  private _panInput: PanInput | null;
  private _stateMachine: StateMachine;

  private _animatingContext: { start: number; end: number };

  public constructor() {
    this._flicking = null;
    this._animatingContext = { start: 0, end: 0 };
    this._stateMachine = new StateMachine();
  }

  public init(flicking: Flicking) {
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
  }

  public destroy() {
    this._axes?.destroy();
    this._panInput?.destroy();

    return this;
  }

  public getAxes() { return this._axes; }
  public getState() { return this._stateMachine.getState(); }
  public getAnimatingContext() { return this._animatingContext; }
  public isEnabled() { return this._panInput?.isEnable() || false; }

  public enable(): this {
    this._panInput?.enable();

    return this;
  }

  public disable(): this {
    this._panInput?.disable();

    return this;
  }

  public update(): this {
    const flicking = getFlickingAttached(this._flicking, "Control");
    const axes = this._axes!;

    const viewportSize = flicking.getViewport().getSize();
    const cameraRange = flicking.getCamera().getRange();
    const axis = axes.axis.flick;

    axis.circular = flicking.isCircular();
    axis.range = [cameraRange.min, cameraRange.max];
    axis.bounce = parseBounce(flicking.getBounce(), flicking.isHorizontal() ? viewportSize.width : viewportSize.height);

    axes.setTo({ flick: flicking.getCamera().getPosition() }, 0);

    return this;
  }

  public animateTo(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    const axes = this._axes;

    if (!axes) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    this._animatingContext = {
      start: axes.get(["flick"]).flick,
      end: position
    };

    const animate = () => {
      axes.once(AXES_EVENT.FINISH, () => {
        this._animatingContext = { start: 0, end: 0 };
      });

      if (axesEvent) {
        axesEvent.setTo({ flick: position }, duration);
      } else {
        axes.setTo({ flick: position }, duration);
      }
    };

    if (duration === 0) {
      animate();

      return Promise.resolve();
    } else {
      return new Promise(resolve => {
        axes.once(AXES_EVENT.FINISH, () => {
          resolve();
        });

        animate();
      });
    }
  }
}

export default AxesController;
