import { MOVE_TYPE } from "../constants/values";
import { FreeControlOptions, SnapControlOptions, StrictControlOptions } from "../control";
import Flicking from "../Flicking";

import { ValueOf } from "./internal";

/**
 * HTML `string` of single/mutiple HTMLElement, or an instance of `HTMLElement`
 */
export type ElementLike = string | HTMLElement;

/**
 * Flicking Plugin
 */
export interface Plugin {
  /** Initialize the plugin */
  init(flicking: Flicking): void;
  /** Destroy plugin and detach all events binded */
  destroy(): void;
  /** Update plugin to match current Flicking's status */
  update(flicking: Flicking): void;
}

/**
 * Flicking Status returned by {@link Flicking.getStatus}
 */
export interface Status {
  /** An index of the active panel */
  index?: number;
  /** A info to restore camera {@link Camera.position | position} */
  position?: {
    /** An index of the panel camera is located at */
    panel: number;
    /** A progress of the camera position inside the panel */
    progressInPanel: number;
  };
  /** An offset to visible panel's original index. This value is available only when `visiblePanelsOnly` is `true` */
  visibleOffset?: number;
  /** A data array of panels */
  panels: Array<{
    /** An index of the panel */
    index: number;
    /** An `outerHTML` of the panel element */
    html?: string;
  }>;
}

/* eslint-disable @typescript-eslint/indent */
export type MoveTypeOptions<T extends ValueOf<typeof MOVE_TYPE>> = T extends typeof MOVE_TYPE.SNAP
  ? [T] | [T, Partial<SnapControlOptions>]
  : T extends typeof MOVE_TYPE.FREE_SCROLL
    ? [T] | [T, Partial<FreeControlOptions>]
    : T extends typeof MOVE_TYPE.STRICT
      ? [T] | [T, Partial<StrictControlOptions>]
      : [T];
/* eslint-enable */

/**
 * A current parameters of the Camera for updating {@link AxesController}
 * @readonly
 */
export interface ControlParams {
  /** A moveable range for Camera */
  range: {
    min: number;
    max: number;
  };
  /** Current camera position */
  position: number;
  /** A Boolean indicating whether the {@link Flicking.circular | circular} option is enabled */
  circular: boolean;
}
