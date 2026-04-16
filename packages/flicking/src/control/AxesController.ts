/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Axes, { AxesEvents, OnRelease, PanInput } from "@egjs/axes";
import * as AXES from "../constants/internal";
import { ORDER } from "../constants/values";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import Flicking from "../Flicking";
import { ControlParams } from "../types/external";
import { getFlickingAttached, parseBounce } from "../utils";

import StateMachine from "./StateMachine";
import State from "./states/State";

/**
 * A controller that handles the {@link https://naver.github.io/egjs-axes/ | @egjs/axes} events
 * @internal
 */
class AxesController {
  private _flicking: Flicking | null;
  private _axes: Axes | null;
  private _panInput: PanInput | null;
  private _stateMachine: StateMachine;

  private _animatingContext: { start: number; end: number; offset: number };
  private _dragged: boolean;

  /**
   * An {@link https://naver.github.io/egjs-axes/docs/api/Axes | Axes} instance
   * @see https://naver.github.io/egjs-axes/docs/api/Axes
   * @readonly
   */
  public get axes(): Axes | null {
    return this._axes;
  }
  /**
   * An {@link https://naver.github.io/egjs-axes/docs/api/PanInput | PanInput} instance
   * @see https://naver.github.io/egjs-axes/docs/api/PanInput
   * @readonly
   */
  public get panInput(): PanInput | null {
    return this._panInput;
  }
  /**
   * @internal
   */
  public get stateMachine(): StateMachine {
    return this._stateMachine;
  }
  /**
   * A activated {@link State} that shows the current status of the user input or the animation
   */
  public get state(): State {
    return this._stateMachine.state;
  }
  /**
   * A context of the current animation playing
   * @readonly
   */
  public get animatingContext(): { start: number; end: number; offset: number } {
    return this._animatingContext;
  }
  /**
   * A current control parameters of the Axes instance
   */
  public get controlParams(): ControlParams {
    const axes = this._axes;

    if (!axes) {
      return {
        range: { min: 0, max: 0 },
        position: 0,
        circular: false
      };
    }

    const axis = axes.axis[AXES.POSITION_KEY];

    return {
      range: { min: axis.range![0], max: axis.range![1] },
      circular: (axis.circular as boolean[])[0],
      position: this.position
    };
  }

  /**
   * A Boolean indicating whether the user input is enabled
   * @readonly
   */
  public get enabled(): boolean {
    return this._panInput?.isEnabled() ?? false;
  }
  /**
   * Current position value in {@link https://naver.github.io/egjs-axes/docs/api/Axes | Axes} instance
   * @readonly
   */
  public get position(): number {
    return this._axes?.get([AXES.POSITION_KEY])[AXES.POSITION_KEY] ?? 0;
  }
  /**
   * Current range value in {@link https://naver.github.io/egjs-axes/docs/api/Axes | Axes} instance
   * @readonly
   */
  public get range(): number[] {
    return this._axes?.axis[AXES.POSITION_KEY].range ?? [0, 0];
  }
  /**
   * Actual bounce size(px)
   * @readonly
   */
  public get bounce(): number[] | undefined {
    return this._axes?.axis[AXES.POSITION_KEY].bounce as number[] | undefined;
  }

  public constructor() {
    this._resetInternalValues();
    this._stateMachine = new StateMachine();
  }

  /**
   * Initialize AxesController
   * @remarks
   * This method creates and configures the Axes and PanInput instances.
   * @param flicking - An instance of {@link Flicking}
   * @returns The current instance for method chaining
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;

    this._axes = new Axes(
      {
        [AXES.POSITION_KEY]: {
          range: [0, 0],
          circular: false,
          bounce: [0, 0]
        }
      },
      {
        deceleration: flicking.deceleration,
        interruptable: flicking.interruptable,
        nested: flicking.nested,
        easing: flicking.easing
      }
    );
    this._panInput = new PanInput(flicking.viewport.element, {
      inputType: flicking.inputType,
      threshold: flicking.dragThreshold,
      iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
      preventDefaultOnDrag: flicking.preventDefaultOnDrag,
      scale: flicking.horizontal ? [flicking.camera.panelOrder === ORDER.RTL ? 1 : -1, 0] : [0, -1],
      releaseOnScroll: true
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

    return this;
  }

  /**
   * Destroy AxesController and return to initial state
   * @remarks
   * This method destroys the Axes and PanInput instances and removes all event handlers.
   */
  public destroy(): void {
    if (this._axes) {
      this.removePreventClickHandler();
      this._axes.destroy();
    }

    this._panInput?.destroy();

    this._resetInternalValues();
  }

  /**
   * Enable input from the user (mouse/touch)
   * @remarks
   * Enables the PanInput to receive user interactions.
   * @returns The current instance for method chaining
   */
  public enable(): this {
    this._panInput?.enable();

    return this;
  }

  /**
   * Disable input from the user (mouse/touch)
   * @remarks
   * Disables the PanInput to ignore user interactions.
   * @returns The current instance for method chaining
   */
  public disable(): this {
    this._panInput?.disable();

    return this;
  }

  /**
   * Releases ongoing user input (mouse/touch)
   * @remarks
   * Immediately releases the PanInput, simulating the user lifting their finger.
   * @returns The current instance for method chaining
   */
  public release(): this {
    this._panInput?.release();

    return this;
  }

  /**
   * Change the destination and duration of the animation currently playing
   * @remarks
   * This method updates the Axes animation target position and optionally the duration.
   * @param position - A position to move
   * @param duration - Duration of the animation (unit: ms)
   * @returns The current instance for method chaining
   */
  public updateAnimation(position: number, duration?: number): this {
    this._animatingContext = {
      ...this._animatingContext,
      end: position
    };
    this._axes?.updateAnimation({
      destPos: { [AXES.POSITION_KEY]: position },
      duration
    });

    return this;
  }

  /**
   * Stops the animation currently playing
   * @remarks
   * This method immediately stops the Axes animation at the current position.
   * @returns The current instance for method chaining
   */
  public stopAnimation(): this {
    this._axes?.stopAnimation();

    return this;
  }

  /**
   * Update {@link https://naver.github.io/egjs-axes/ | @egjs/axes}'s state
   * @remarks
   * This method synchronizes the Axes state with the given control parameters.
   * @param controlParams - Control parameters
   * @throws {@link InitializationErrors}
   * @returns The current instance for method chaining
   */
  public update(controlParams: ControlParams): this {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const axes = this._axes!;
    const axis = axes.axis[AXES.POSITION_KEY];

    axis.circular = [controlParams.circular, controlParams.circular];
    axis.range = [controlParams.range.min, controlParams.range.max];
    axis.bounce = parseBounce(flicking.bounce, camera.size);

    axes.axisManager.set({ [AXES.POSITION_KEY]: controlParams.position });

    return this;
  }

  /**
   * Attach a handler to the camera element to prevent click events during animation
   * @remarks
   * This is used when {@link FlickingOptions.preventClickOnDrag | preventClickOnDrag} is enabled.
   * @returns The current instance for method chaining
   */
  public addPreventClickHandler(): this {
    const flicking = getFlickingAttached(this._flicking);
    const axes = this._axes!;
    const cameraEl = flicking.camera.element;

    axes.on(AXES.EVENT.HOLD, this._onAxesHold);
    axes.on(AXES.EVENT.CHANGE, this._onAxesChange);
    cameraEl.addEventListener("click", this._preventClickWhenDragged, true);

    return this;
  }

  /**
   * Detach a handler to the camera element to prevent click events during animation
   * @remarks
   * This is used when {@link FlickingOptions.preventClickOnDrag | preventClickOnDrag} is disabled.
   * @returns The current instance for method chaining
   */
  public removePreventClickHandler(): this {
    const flicking = getFlickingAttached(this._flicking);
    const axes = this._axes!;
    const cameraEl = flicking.camera.element;

    axes.off(AXES.EVENT.HOLD, this._onAxesHold);
    axes.off(AXES.EVENT.CHANGE, this._onAxesChange);
    cameraEl.removeEventListener("click", this._preventClickWhenDragged, true);

    return this;
  }

  /**
   * Run Axes's {@link https://naver.github.io/egjs-axes/docs/api/Axes#setTo | setTo} using the given position
   * @remarks
   * If the target position equals the current position, the promise resolves immediately without animation.
   * @param position - A position to move
   * @param duration - Duration of the animation (unit: ms)
   * @param axesEvent - If provided, it'll use its {@link https://naver.github.io/egjs-axes/docs/api/Axes#setTo | setTo} method instead
   * @throws {@link MovementErrors}
   * @returns A Promise which will be resolved after reaching the target position
   */
  public animateTo(position: number, duration: number, axesEvent?: OnRelease): Promise<void> {
    const axes = this._axes;
    const state = this._stateMachine.state;

    if (!axes) {
      return Promise.reject(
        new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING, ERROR.CODE.NOT_ATTACHED_TO_FLICKING)
      );
    }

    const startPos = this.getCurrentPosition();

    if (startPos === position) {
      const flicking = getFlickingAttached(this._flicking);

      flicking.camera.lookAt(position);

      if (state.targetPanel) {
        flicking.control.setActive(state.targetPanel, flicking.control.activePanel, axesEvent?.isTrusted ?? false);
      }
      return Promise.resolve();
    }

    this._animatingContext = {
      start: startPos,
      end: position,
      offset: 0
    };

    const animate = () => {
      const resetContext = () => {
        this._animatingContext = { start: 0, end: 0, offset: 0 };
      };

      axes.once(AXES.EVENT.FINISH, resetContext);

      if (axesEvent) {
        axesEvent.setTo({ [AXES.POSITION_KEY]: position }, duration);
      } else {
        axes.setTo({ [AXES.POSITION_KEY]: position }, duration);
      }
    };

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
      axes.once(AXES.EVENT.HOLD, interruptionHandler);

      animate();
    });
  }

  /**
   * Returns the current axes position
   */
  public getCurrentPosition() {
    return this._axes?.get([AXES.POSITION_KEY])[AXES.POSITION_KEY] ?? 0;
  }

  public updateDirection() {
    const flicking = getFlickingAttached(this._flicking);
    const axes = this._axes!;
    const panInput = this._panInput!;

    axes.disconnect(panInput);
    axes.connect(flicking.horizontal ? [AXES.POSITION_KEY, ""] : ["", AXES.POSITION_KEY], panInput);

    panInput.options.scale = flicking.horizontal ? [flicking.camera.panelOrder === ORDER.RTL ? 1 : -1, 0] : [0, -1];
  }

  /**
   * @internal
   * @privateRemarks
   * Resets all internal values to their defaults. Called during construction and destruction.
   */
  private _resetInternalValues() {
    this._flicking = null;
    this._axes = null;
    this._panInput = null;
    this._animatingContext = { start: 0, end: 0, offset: 0 };
    this._dragged = false;
  }

  /**
   * @internal
   * @privateRemarks
   * Handles the Axes hold event to reset the dragged state.
   */
  private _onAxesHold = () => {
    this._dragged = false;
  };

  /**
   * @internal
   * @privateRemarks
   * Handles the Axes change event to update the dragged state.
   */
  private _onAxesChange = () => {
    this._dragged = !!this._panInput?.isEnabled();
  };

  /**
   * @internal
   * @privateRemarks
   * Prevents click events when the user has dragged. Used for {@link FlickingOptions.preventClickOnDrag}.
   */
  private _preventClickWhenDragged = (e: MouseEvent) => {
    if (this._dragged) {
      e.preventDefault();
      e.stopPropagation();
    }

    this._dragged = false;
  };
}

export default AxesController;
