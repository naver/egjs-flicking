import type { MoveEndEvent, MoveEvent, MoveStartEvent, Plugin, SelectEvent, WillChangeEvent } from "@egjs/flicking";
import Flicking, { clamp, EVENTS } from "@egjs/flicking";

import { SYNC } from "./const";
import { addClass, removeClass } from "./utils";

/**
 * Options for the {@link Sync} plugin
 */
export interface SyncOptions {
  /**
   * Method to synchronize between Flickings. `"camera"` syncs by camera position, `"index"` syncs by panel index
   * @defaultValue "camera"
   */
  type: typeof SYNC.TYPE.CAMERA | typeof SYNC.TYPE.INDEX;
  /**
   * Detailed options for each Flicking instance to synchronize
   * @defaultValue []
   */
  synchronizedFlickingOptions: SychronizableFlickingOptions[];
}

/**
 * Per-instance synchronization options used in {@link SyncOptions.synchronizedFlickingOptions}
 */
export interface SychronizableFlickingOptions {
  /**
   * The Flicking instance to synchronize
   */
  flicking: Flicking;
  /**
   * Whether clicking this Flicking's panel changes the index of all synced Flickings
   * @defaultValue false
   */
  isClickable?: boolean;
  /**
   * Whether mouse/touch scroll on this Flicking changes other Flickings' index. Only available for the `"index"` type
   * @defaultValue false
   */
  isSlidable?: boolean;
  /**
   * CSS class added to the active (selected) panel
   * @defaultValue undefined
   */
  activeClass?: string;
}

/**
 * Plugin for synchronizing multiple Flicking instances
 * @see {@link https://naver.github.io/egjs-flicking/docs/demos/plugins/sync | Demo: Sync}
 */
class Sync implements Plugin {
  /* Internal Values */
  private _flicking: Flicking | null = null;
  private _disabledIndex: number[] = [];

  /* Options */
  private _type: SyncOptions["type"];
  private _synchronizedFlickingOptions: SyncOptions["synchronizedFlickingOptions"];

  /** Current value of the {@link SyncOptions.type | type} option. */
  public get type() {
    return this._type;
  }
  /** Current value of the {@link SyncOptions.synchronizedFlickingOptions | synchronizedFlickingOptions} option. */
  public get synchronizedFlickingOptions() {
    return this._synchronizedFlickingOptions;
  }

  /** Sets {@link SyncOptions.type | type}. */
  public set type(val: SyncOptions["type"]) {
    this._type = val;
  }

  /** Sets {@link SyncOptions.synchronizedFlickingOptions | synchronizedFlickingOptions}. */
  public set synchronizedFlickingOptions(val: SyncOptions["synchronizedFlickingOptions"]) {
    this._synchronizedFlickingOptions = val;
  }

  /**
   * @param options - Options for the Sync instance
   * @example
   * ```ts
   * flicking.addPlugins(new Sync({
   *   type: "camera",
   *   synchronizedFlickingOptions: [
   *     { flicking: flicking1 },
   *     { flicking: flicking2, isClickable: true }
   *   ]
   * }));
   * ```
   */
  public constructor(options: Partial<SyncOptions> = {}) {
    const { type = SYNC.TYPE.CAMERA, synchronizedFlickingOptions = [] } = options;

    this._type = type;
    this._synchronizedFlickingOptions = synchronizedFlickingOptions;
  }

  /** Initialize the plugin and set up synchronization event listeners between Flicking instances.
   * @param flicking - The Flicking instance to attach this plugin to
   */
  public init(flicking: Flicking): void {
    const synced = this._synchronizedFlickingOptions;

    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;

    this._addEvents();

    synced.forEach(options => {
      const { flicking: syncedFlicking } = options;

      this._updateClass(options, syncedFlicking.defaultIndex);
    });
  }

  /** Destroy the plugin and remove all synchronization event listeners. */
  public destroy(): void {
    const flicking = this._flicking;

    if (!flicking) {
      return;
    }

    this._removeEvents();

    this._flicking = null;
  }

  /** Update the active class state for all synchronized Flicking instances. */
  public update(): void {
    this._synchronizedFlickingOptions.forEach(options => {
      this._updateClass(options, options.flicking.index);
    });
  }

  private _preventEvent(fn: () => void) {
    this._removeEvents();
    fn();
    this._addEvents();
  }

  private _addEvents = (): void => {
    const type = this._type;
    const synced = this._synchronizedFlickingOptions;

    synced.forEach(({ flicking, isSlidable, isClickable }) => {
      if (type === SYNC.TYPE.CAMERA) {
        flicking.on(EVENTS.MOVE, this._onMove);
        flicking.on(EVENTS.MOVE_START, this._onMoveStart);
        flicking.on(EVENTS.MOVE_END, this._onMoveEnd);
      }
      if (type === SYNC.TYPE.INDEX && isSlidable) {
        flicking.on(EVENTS.WILL_CHANGE, this._onIndexChange);
        flicking.on(EVENTS.WILL_RESTORE, this._onIndexChange);
      }
      if (isClickable) {
        flicking.on(EVENTS.SELECT, this._onSelect);
      }
    });
  };

  private _removeEvents = (): void => {
    const type = this._type;
    const synced = this._synchronizedFlickingOptions;

    synced.forEach(({ flicking, isSlidable, isClickable }) => {
      if (type === SYNC.TYPE.CAMERA) {
        flicking.off(EVENTS.MOVE, this._onMove);
        flicking.off(EVENTS.MOVE_START, this._onMoveStart);
        flicking.off(EVENTS.MOVE_END, this._onMoveEnd);
      }
      if (type === SYNC.TYPE.INDEX && isSlidable) {
        flicking.off(EVENTS.WILL_CHANGE, this._onIndexChange);
        flicking.off(EVENTS.WILL_RESTORE, this._onIndexChange);
      }
      if (isClickable) {
        flicking.off(EVENTS.SELECT, this._onSelect);
      }
    });
  };

  private _onIndexChange = (e: WillChangeEvent): void => {
    const flicking = e.currentTarget;

    if (!flicking.initialized) {
      return;
    }

    this._synchronizeByIndex(flicking, e.index);
  };

  private _onMove = (e: MoveEvent): void => {
    const camera = e.currentTarget.camera;
    const progress = (camera.position - camera.range.min) / camera.rangeDiff;

    this._synchronizedFlickingOptions.forEach(({ flicking }) => {
      if (flicking === e.currentTarget) return;

      let targetPosition = 0;

      if (camera.position < camera.range.min) {
        targetPosition = camera.position;
      } else if (camera.position > camera.range.max) {
        targetPosition = flicking.camera.range.max + camera.position - camera.range.max;
      } else {
        targetPosition = flicking.camera.range.min + flicking.camera.rangeDiff * progress;
      }

      void flicking.camera.lookAt(targetPosition);
    });
  };

  private _onMoveStart = (e: MoveStartEvent): void => {
    this._disabledIndex = [];
    this._synchronizedFlickingOptions.forEach(({ flicking }, i) => {
      if (flicking !== e.currentTarget && flicking.control.controller.enabled) {
        this._disabledIndex.push(i);
        flicking.disableInput();
      }
    });
  };

  private _onMoveEnd = (e: MoveEndEvent): void => {
    this._disabledIndex.forEach(i => {
      const flicking = this._synchronizedFlickingOptions[i].flicking;
      flicking.enableInput();
      flicking.control.updateInput();
    });
  };

  private _onSelect = (e: SelectEvent): void => {
    void e.currentTarget.moveTo(e.index).catch(() => void 0);

    this._synchronizeByIndex(e.currentTarget, e.index);
  };

  private _synchronizeByIndex = (activeFlicking: Flicking, index: number): void => {
    const synchronizedFlickingOptions = this._synchronizedFlickingOptions;

    this._preventEvent(() => {
      synchronizedFlickingOptions.forEach(options => {
        // Active class should be applied same to the Flicking which triggered event
        this._updateClass(options, index);

        const { flicking } = options;
        if (flicking === activeFlicking) return;

        const targetIndex = clamp(index, 0, flicking.panels.length);

        if (flicking.animating) {
          // Reserve moveTo once previous animation is finished
          flicking.once(EVENTS.MOVE_END, () => {
            void flicking.moveTo(targetIndex).catch(() => void 0);
          });
        } else {
          void flicking.moveTo(targetIndex);
        }
      });
    });
  };

  private _updateClass = ({ flicking, activeClass }: SychronizableFlickingOptions, index: number): void => {
    if (!activeClass) return;

    flicking.panels.forEach(panel => {
      if (panel.index === index) {
        addClass(panel.element, activeClass);
      } else {
        removeClass(panel.element, activeClass);
      }
    });
  };
}

export default Sync;
