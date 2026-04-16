import Flicking, { DIRECTION, EVENTS, MOVE_TYPE, Plugin } from "@egjs/flicking";

/**
 * Options for the {@link AutoPlay} plugin
 */
export interface AutoPlayOptions {
  /**
   * Time to wait before moving on to the next panel (ms)
   * @defaultValue 2000
   */
  duration: number;
  /**
   * Duration of the panel move animation (ms). If `undefined`, the Flicking instance's `duration` is used
   * @defaultValue undefined
   */
  animationDuration: number | undefined;
  /**
   * The direction in which the panel moves
   * @defaultValue "NEXT"
   */
  direction: (typeof DIRECTION)["NEXT"] | (typeof DIRECTION)["PREV"];
  /**
   * Whether to stop when the mouse hovers over the element
   * @defaultValue false
   */
  stopOnHover: boolean;
  /**
   * Whether to stop autoplay when the plugin is first initialized
   * @defaultValue false
   */
  stopOnInit: boolean;
  /**
   * If `stopOnHover` is true, time to wait before resuming after mouse leaves (ms)
   * @defaultValue Same as `duration`
   */
  delayAfterHover: number;
}

/**
 * Plugin that allows you to automatically move to the next/previous panel on a specific time basis
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/autoplay | Demo: AutoPlay}
 */
class AutoPlay implements Plugin {
  /* Options */
  private _duration: AutoPlayOptions["duration"];
  private _animationDuration: AutoPlayOptions["animationDuration"];
  private _direction: AutoPlayOptions["direction"];
  private _stopOnHover: AutoPlayOptions["stopOnHover"];
  private _stopOnInit: AutoPlayOptions["stopOnInit"];
  private _delayAfterHover: AutoPlayOptions["delayAfterHover"];

  /* Internal Values */
  private _flicking: Flicking | null = null;
  private _timerId = 0;
  private _mouseEntered = false;
  private _playing = false;

  /** Current value of the {@link AutoPlayOptions.duration | duration} option. */
  public get duration() {
    return this._duration;
  }
  /** Current value of the {@link AutoPlayOptions.animationDuration | animationDuration} option. */
  public get animationDuration() {
    return this._animationDuration;
  }
  /** Current value of the {@link AutoPlayOptions.direction | direction} option. */
  public get direction() {
    return this._direction;
  }
  /** Current value of the {@link AutoPlayOptions.stopOnHover | stopOnHover} option. */
  public get stopOnHover() {
    return this._stopOnHover;
  }
  /** Current value of the {@link AutoPlayOptions.stopOnInit | stopOnInit} option. */
  public get stopOnInit() {
    return this._stopOnInit;
  }
  /** Current value of the {@link AutoPlayOptions.delayAfterHover | delayAfterHover} option. */
  public get delayAfterHover() {
    return this._delayAfterHover;
  }
  /** Whether the autoplay is currently active
   * @readonly
   */
  public get playing() {
    return this._playing;
  }

  /** Sets {@link AutoPlayOptions.duration | duration}. */
  public set duration(val: number) {
    this._duration = val;
  }
  /** Sets {@link AutoPlayOptions.animationDuration | animationDuration}. */
  public set animationDuration(val: number | undefined) {
    this._animationDuration = val;
  }
  /** Sets {@link AutoPlayOptions.direction | direction}. */
  public set direction(val: AutoPlayOptions["direction"]) {
    this._direction = val;
  }
  /** Sets {@link AutoPlayOptions.stopOnHover | stopOnHover}. */
  public set stopOnHover(val: boolean) {
    this._stopOnHover = val;
  }
  /** Sets {@link AutoPlayOptions.stopOnInit | stopOnInit}. */
  public set stopOnInit(val: boolean) {
    this._stopOnInit = val;
  }
  /** Sets {@link AutoPlayOptions.delayAfterHover | delayAfterHover}. */
  public set delayAfterHover(val: number) {
    this._delayAfterHover = val;
  }

  /**
   * @param options - Options for the AutoPlay instance
   * @example
   * ```ts
   * flicking.addPlugins(new AutoPlay({ duration: 2000, direction: "NEXT" }));
   * ```
   */
  public constructor(options: Partial<AutoPlayOptions> = {}) {
    const {
      duration = 2000,
      animationDuration = undefined,
      direction = DIRECTION.NEXT,
      stopOnHover = false,
      stopOnInit = false,
      delayAfterHover
    } = options;

    this._duration = duration;
    this._animationDuration = animationDuration;
    this._direction = direction;
    this._stopOnHover = stopOnHover;
    this._stopOnInit = stopOnInit;
    this._delayAfterHover = delayAfterHover ?? duration;
  }

  /** Initialize the plugin and start autoplay on the given Flicking instance.
   * @param flicking - The Flicking instance to attach this plugin to
   */
  public init(flicking: Flicking): void {
    if (this._flicking) {
      this.destroy();
    }

    flicking.on({
      [EVENTS.MOVE_START]: this.stop,
      [EVENTS.HOLD_START]: this.stop,
      [EVENTS.MOVE_END]: this.play,
      [EVENTS.SELECT]: this.play
    });

    this._flicking = flicking;
    if (this._stopOnHover) {
      const targetEl = this._flicking.element;
      targetEl.addEventListener("mouseenter", this._onMouseEnter, false);
      targetEl.addEventListener("mouseleave", this._onMouseLeave, false);
    }

    if (!this._stopOnInit) {
      this.play();
    }
  }

  /** Destroy the plugin, stop autoplay, and remove all event listeners. */
  public destroy(): void {
    const flicking = this._flicking;

    this._mouseEntered = false;
    this.stop();

    if (!flicking) {
      return;
    }

    flicking.off(EVENTS.MOVE_START, this.stop);
    flicking.off(EVENTS.HOLD_START, this.stop);
    flicking.off(EVENTS.MOVE_END, this.play);
    flicking.off(EVENTS.SELECT, this.play);

    const targetEl = flicking.element;
    targetEl.removeEventListener("mouseenter", this._onMouseEnter, false);
    targetEl.removeEventListener("mouseleave", this._onMouseLeave, false);

    this._flicking = null;
  }

  /** Update the plugin state. This is a no-op for AutoPlay. */
  public update(): void {
    // DO-NOTHING
  }

  /** Start the autoplay timer. Panels will move automatically after the configured {@link AutoPlayOptions.duration | duration}. */
  public play = () => {
    this._movePanel(this._duration);
  };

  /** Stop the autoplay timer and cancel any pending panel movement. */
  public stop = () => {
    this._playing = false;
    clearTimeout(this._timerId);
  };

  private _movePanel(duration: number): void {
    const flicking = this._flicking;
    const direction = this._direction;

    if (!flicking) {
      return;
    }

    this.stop();

    if (this._mouseEntered || flicking.animating) {
      return;
    }

    this._playing = true;
    this._timerId = window.setTimeout(() => {
      let animationDuration = this._animationDuration || flicking.duration;
      const moveType = flicking.moveType;
      // for freeScroll
      if (moveType === MOVE_TYPE.FREE_SCROLL || moveType?.[0] === MOVE_TYPE.FREE_SCROLL) {
        const range = flicking.camera.range;
        const cameraPosition = flicking.camera.position;
        const currentPanel = flicking.currentPanel;
        const prevPanel = currentPanel.prev();
        const nextPanel = currentPanel.next();
        const currentPosition = currentPanel.position;
        let nextPosition = nextPanel?.position ?? range.max;
        let prevPosition = prevPanel?.position ?? range.min;

        // circular: prev (last) > cur (0) => prev(-1) < cur(0)
        if (prevPosition > currentPosition) {
          prevPosition = range.min - (range.max - prevPosition);
        }
        // current (last) > next (0)
        if (nextPosition < currentPosition) {
          nextPosition += range.max;
        }
        if (direction === DIRECTION.NEXT) {
          // prev - cur - camera - next
          const size = nextPosition - currentPosition;
          let restSize = nextPosition - cameraPosition;

          if (cameraPosition < currentPosition) {
            // prev - camera - cur - next
            restSize = nextPosition - cameraPosition;
          }

          animationDuration *= restSize / size;
        } else {
          // prev - caemra - cur - next
          const size = currentPosition - prevPosition;
          let restSize = cameraPosition - prevPosition;

          if (cameraPosition > currentPosition) {
            // prev - cur - camera - next
            restSize = cameraPosition - prevPosition;
          }
          animationDuration *= restSize / size;
        }
      }

      if (direction === DIRECTION.NEXT) {
        flicking.next(animationDuration).catch(() => void 0);
      } else {
        flicking.prev(animationDuration).catch(() => void 0);
      }

      this.play();
    }, duration);
  }

  private _onMouseEnter = () => {
    this._mouseEntered = true;
    this.stop();
  };

  private _onMouseLeave = () => {
    this._mouseEntered = false;
    this._movePanel(this._delayAfterHover);
  };
}

export default AutoPlay;
