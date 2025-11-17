/**
 * All possible @egjs/axes event keys
 * @internal
 */
export const EVENT = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ANIMATION_END: "animationEnd",
  FINISH: "finish"
} as const;

/**
 * An Axis key that Flicking uses
 * @internal
 */
export const POSITION_KEY = "flick";
