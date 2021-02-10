/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { PanInput, AxesEvents, OnRelease } from "@egjs/axes";

import Flicking from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import StateMachine from "~/control/StateMachine";
import * as AXES from "~/const/axes";
import * as ERROR from "~/const/error";
import { getFlickingAttached, parseBounce } from "~/utils";

class AxesController {
  private _flicking: Flicking | null;
  private _axes: Axes | null;
  private _panInput: PanInput | null;
  private _stateMachine: StateMachine;

  private _animatingContext: { start: number; end: number };

  public get axes() { return this._axes; }
  public get state() { return this._stateMachine.state; }
  public get animatingContext() { return this._animatingContext; }
  public get enabled() { return this._panInput?.isEnable() ?? false; }
  public get position() { return this._axes?.get([AXES.POSITION_KEY])[AXES.POSITION_KEY] ?? 0; }

  public constructor() {
    this._resetInternalValues();
    this._stateMachine = new StateMachine();
  }

  public init(flicking: Flicking) {
    this._flicking = flicking;

    this._axes = new Axes({
      [AXES.POSITION_KEY]: {
        range: [0, 0],
        circular: false,
        bounce: [0, 0]
      }
    }, {
      deceleration: flicking.deceleration,
      interruptable: flicking.interruptable,
      easing: flicking.easing
    });
    this._panInput = new PanInput(flicking.viewport.element, {
      inputType: flicking.inputType,
      iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
      scale: flicking.horizontal ? [-1, 0] : [0, -1]
    });

    const axes = this._axes;

    axes.connect(flicking.horizontal ? [AXES.POSITION_KEY, ""] : ["", AXES.POSITION_KEY], this._panInput);

    for (const key in AXES.EVENT) {
      const eventType = AXES.EVENT[key] as keyof AxesEvents;

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

    this._resetInternalValues();

    return this;
  }

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
    const camera = flicking.camera;
    const axes = this._axes!;
    const controlParams = camera.getControlParameters();
    const axis = axes.axis[AXES.POSITION_KEY];

    axis.circular = [controlParams.circular, controlParams.circular];
    axis.range = [controlParams.range.min, controlParams.range.max];
    axis.bounce = parseBounce(flicking.bounce, camera.size);

    axes.axm.set({ [AXES.POSITION_KEY]: controlParams.position });

    return this;
  }

  public animateTo(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    const axes = this._axes;

    if (!axes) {
      return Promise.reject(new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), ERROR.CODE.NOT_ATTACHED_TO_FLICKING));
    }

    const startPos = axes.get([AXES.POSITION_KEY])[AXES.POSITION_KEY];

    if (startPos === position) {
      return Promise.resolve();
    }

    this._animatingContext = {
      start: startPos,
      end: position
    };

    const animate = () => {
      axes.once(AXES.EVENT.FINISH, () => {
        this._animatingContext = { start: 0, end: 0 };
      });

      if (axesEvent) {
        axesEvent.setTo({ [AXES.POSITION_KEY]: position }, duration);
      } else {
        axes.setTo({ [AXES.POSITION_KEY]: position }, duration);
      }
    };

    if (duration === 0) {
      animate();
      axes.axm.set({ [AXES.POSITION_KEY]: position });

      return Promise.resolve();
    } else {
      return new Promise((resolve, reject) => {
        const animationFinishHandler = () => {
          axes.off(AXES.EVENT.HOLD, interruptionHandler);
          resolve();
        };

        const interruptionHandler = () => {
          axes.off(AXES.EVENT.FINISH, animationFinishHandler);
          reject(new FlickingError(ERROR.MESSAGE.ANIMATION_INTERRUPTED, ERROR.CODE.ANIMATION_INTERRUPTED));
        };

        axes.once(AXES.EVENT.FINISH, animationFinishHandler);

        if (!axesEvent) {
          axes.once(AXES.EVENT.HOLD, interruptionHandler);
        }

        animate();
      });
    }
  }

  protected _resetInternalValues() {
    this._flicking = null;
    this._axes = null;
    this._panInput = null;
    this._animatingContext = { start: 0, end: 0 };
  }
}

export default AxesController;
