/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { OnRelease } from "@egjs/axes";
import { ComponentEvent } from "@egjs/component";
import { DIRECTION } from "../constants/values";
import AxesController from "../control/AxesController";
import Panel from "../core/panel/Panel";
import * as ERROR from "../error/codes";
import FlickingError from "../error/FlickingError";
import { EVENTS } from "../event/names";
import Flicking from "../Flicking";
import { ValueOf } from "../types/internal";
import { getDirection, getFlickingAttached } from "../utils";

/**
 * Parameters for {@link Control.moveToPanel}
 * @public
 */
export interface MoveToPanelParams {
  /** Duration of the animation (unit: ms) */
  duration: number;
  /** Direction to move, only available in the {@link Flicking.circular | circular} mode */
  direction?: ValueOf<typeof DIRECTION>;
  /** {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-release | release} event of {@link https://naver.github.io/egjs-axes/ | Axes} */
  axesEvent?: OnRelease;
}

/**
 * A component that manages inputs and animation of Flicking
 * @public
 */
abstract class Control {
  // Internal States
  protected _flicking: Flicking | null;
  protected _controller: AxesController;
  protected _activePanel: Panel | null;
  protected _nextPanel: Panel | null;

  /**
   * A controller that handles the {@link https://naver.github.io/egjs-axes/ | @egjs/axes} events
   * @readonly
   */
  public get controller(): AxesController {
    return this._controller;
  }
  /**
   * Index number of the {@link Flicking.currentPanel | currentPanel}
   * @defaultValue 0
   * @readonly
   */
  public get activeIndex(): number {
    return this._activePanel?.index ?? -1;
  }
  /**
   * An active panel
   * @readonly
   */
  public get activePanel(): Panel | null {
    return this._activePanel;
  }
  /**
   * Whether Flicking's animating
   * @readonly
   */
  public get animating(): boolean {
    return this._controller.state.animating;
  }
  /**
   * Whether user is clicking or touching
   * @readonly
   */
  public get holding(): boolean {
    return this._controller.state.holding;
  }

  public constructor() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activePanel = null;
  }

  /**
   * Move {@link Camera} to the given position
   * @param position - The target position to move
   * @param duration - Duration of the panel movement animation (unit: ms)
   * @param axesEvent - {@link https://naver.github.io/egjs-axes/docs/api/Axes#event-release | release} event of {@link https://naver.github.io/egjs-axes/ | Axes}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns A Promise which will be resolved after reaching the target position
   */
  public abstract moveToPosition(position: number, duration: number, axesEvent?: OnRelease): Promise<void>;

  /**
   * Initialize Control
   * @remarks
   * This method is called automatically during {@link Flicking.init}. It initializes the internal controller.
   * @param flicking - An instance of {@link Flicking}
   * @returns The current instance for method chaining
   */
  public init(flicking: Flicking): this {
    this._flicking = flicking;
    this._controller.init(flicking);

    return this;
  }

  /**
   * Destroy Control and return to initial state
   * @remarks
   * This method destroys the internal controller and resets all internal values.
   */
  public destroy(): void {
    this._controller.destroy();

    this._flicking = null;
    this._activePanel = null;
  }

  /**
   * Enable input from the user (mouse/touch)
   * @remarks
   * This is a shorthand for `Flicking.enableInput`.
   * @returns The current instance for method chaining
   */
  public enable(): this {
    this._controller.enable();

    return this;
  }

  /**
   * Disable input from the user (mouse/touch)
   * @remarks
   * This is a shorthand for `Flicking.disableInput`.
   * @returns The current instance for method chaining
   */
  public disable(): this {
    this._controller.disable();

    return this;
  }

  /**
   * Releases ongoing user input (mouse/touch)
   * @remarks
   * This method immediately releases the user's input, similar to the user lifting their finger.
   * @returns The current instance for method chaining
   */
  public release(): this {
    this._controller.release();

    return this;
  }

  /**
   * Change the destination and duration of the animation currently playing
   * @remarks
   * This method does nothing if no animation is currently playing.
   * @param panel - The target panel to move
   * @param duration - Duration of the animation (unit: ms)
   * @param direction - Direction to move, only available in the {@link Flicking.circular | circular} mode
   * @throws {@link AnimationUpdateErrors}
   * @returns The current instance for method chaining
   */
  public updateAnimation(panel: Panel, duration?: number, direction?: ValueOf<typeof DIRECTION>): this {
    const state = this._controller.state;
    const position = this._getPosition(panel, direction ?? DIRECTION.NONE);

    state.targetPanel = panel;
    this._controller.updateAnimation(position, duration);

    return this;
  }

  /**
   * Stops the animation currently playing
   * @remarks
   * This method does nothing if no animation is currently playing.
   * @returns The current instance for method chaining
   */
  public stopAnimation(): this {
    const state = this._controller.state;

    state.targetPanel = null;
    this._controller.stopAnimation();

    return this;
  }

  /**
   * Update position after resizing
   * @remarks
   * This method moves the camera to the active panel's position after a resize operation.
   * @param progressInPanel - Previous camera's progress in active panel before resize
   * @throws {@link InitializationErrors}
   */
  public updatePosition(progressInPanel: number): void {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    if (activePanel) {
      camera.lookAt(camera.clampToReachablePosition(activePanel.position));
    }
  }

  /**
   * Update {@link Control.controller | controller}'s state
   * @remarks
   * This method synchronizes the controller state with the current camera parameters.
   * @returns The current instance for method chaining
   */
  public updateInput(): this {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;

    this._controller.update(camera.controlParams);

    return this;
  }

  /**
   * Reset {@link Control.activePanel | activePanel} to `null`
   * @remarks
   * This method is called when the active panel is removed from the renderer.
   * @returns The current instance for method chaining
   */
  public resetActive(): this {
    this._activePanel = null;

    return this;
  }

  /**
   * Move {@link Camera} to the given panel
   * @param panel - The target panel to move
   * @param options - {@link MoveToPanelParams}
   * @fires {@link MovementEvents}
   * @throws {@link MovementErrors}
   * @returns A Promise which will be resolved after reaching the target panel
   */
  public async moveToPanel(
    panel: Panel,
    { duration, direction = DIRECTION.NONE, axesEvent }: MoveToPanelParams
  ): Promise<void> {
    const position = this._getPosition(panel, direction);
    this._triggerIndexChangeEvent(panel, panel.position, axesEvent, direction);

    return this._animateToPosition({ position, duration, newActivePanel: panel, axesEvent });
  }

  /**
   * @internal
   * @privateRemarks
   * Sets the active panel and triggers {@link ChangedEvent} or {@link RestoredEvent} based on whether the panel changed.
   */
  public setActive(newActivePanel: Panel, prevActivePanel: Panel | null, isTrusted: boolean) {
    const flicking = getFlickingAttached(this._flicking);

    this._activePanel = newActivePanel;
    this._nextPanel = null;

    flicking.camera.updateAdaptiveHeight();

    if (newActivePanel !== prevActivePanel) {
      flicking.trigger(
        new ComponentEvent(EVENTS.CHANGED, {
          index: newActivePanel.index,
          panel: newActivePanel,
          prevIndex: prevActivePanel?.index ?? -1,
          prevPanel: prevActivePanel,
          isTrusted,
          direction: prevActivePanel ? getDirection(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
        })
      );
    } else {
      flicking.trigger(
        new ComponentEvent(EVENTS.RESTORED, {
          isTrusted
        })
      );
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Copies internal state from another Control instance. Used when changing moveType option.
   */
  public copy(control: Control) {
    this._flicking = control._flicking;
    this._activePanel = control._activePanel;
    this._controller = control._controller;
  }

  /**
   * @internal
   * @privateRemarks
   * Triggers {@link WillChangeEvent} or {@link WillRestoreEvent} based on whether the target panel differs from the active panel.
   */
  protected _triggerIndexChangeEvent(
    panel: Panel,
    position: number,
    axesEvent?: OnRelease,
    direction?: ValueOf<typeof DIRECTION>
  ) {
    const flicking = getFlickingAttached(this._flicking);
    const triggeringEvent = panel !== this._activePanel ? EVENTS.WILL_CHANGE : EVENTS.WILL_RESTORE;
    const camera = flicking.camera;
    const activePanel = this._activePanel;

    const event = new ComponentEvent(triggeringEvent, {
      index: panel.index,
      panel,
      isTrusted: axesEvent?.isTrusted || false,
      direction: direction ?? getDirection(activePanel?.position ?? camera.position, position)
    });

    this._nextPanel = panel;
    flicking.trigger(event);

    if (event.isCanceled()) {
      throw new FlickingError(ERROR.MESSAGE.STOP_CALLED_BY_USER, ERROR.CODE.STOP_CALLED_BY_USER);
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Animates the camera to the target position and handles animation completion or interruption.
   */
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
    const flicking = getFlickingAttached(this._flicking);
    // 거리(1px 미만)가 매우 짧은 경우 duration이 늘어지는걸 방지하기 위해 0으로 바꿔 즉시 변경
    let nextDuration = duration;

    if (Math.abs(nextDuration - position) < flicking.animationThreshold) {
      nextDuration = 0;
    }
    const animate = () => this._controller.animateTo(position, nextDuration, axesEvent);
    const state = this._controller.state;

    state.targetPanel = newActivePanel;

    if (nextDuration <= 0) {
      return animate();
    } else {
      return animate()
        .then(async () => {
          if (flicking.initialized) {
            await flicking.renderer.render();
          }
        })
        .catch(err => {
          if (axesEvent && err instanceof FlickingError && err.code === ERROR.CODE.ANIMATION_INTERRUPTED) return;
          throw err;
        });
    }
  }

  /**
   * @internal
   * @privateRemarks
   * Calculates the target position for a panel, considering circular mode and direction constraints.
   */
  private _getPosition(panel: Panel, direction: ValueOf<typeof DIRECTION> = DIRECTION.NONE) {
    const flicking = getFlickingAttached(this._flicking);
    const camera = flicking.camera;

    let position = panel.position;
    const nearestAnchor = camera.findNearestAnchor(position);

    if (panel.removed || !nearestAnchor) {
      throw new FlickingError(ERROR.MESSAGE.POSITION_NOT_REACHABLE(panel.position), ERROR.CODE.POSITION_NOT_REACHABLE);
    }
    if (!camera.canReach(panel)) {
      // Override position & panel if that panel is not reachable
      position = nearestAnchor.position;
      panel = nearestAnchor.panel;
    } else if (flicking.circularEnabled) {
      // Circular mode is enabled, find nearest distance to panel
      const camPos = this._controller.position; // Actual position of the Axes
      const camRangeDiff = camera.rangeDiff;
      const possiblePositions = [position, position + camRangeDiff, position - camRangeDiff].filter(pos => {
        if (direction === DIRECTION.NONE) return true;

        return direction === DIRECTION.PREV ? pos <= camPos : pos >= camPos;
      });

      position = possiblePositions.reduce((nearestPosition, pos) => {
        if (Math.abs(camPos - pos) < Math.abs(camPos - nearestPosition)) {
          return pos;
        } else {
          return nearestPosition;
        }
      }, Infinity);
    }

    return position;
  }
}

export default Control;
