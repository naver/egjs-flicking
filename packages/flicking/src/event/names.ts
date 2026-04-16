/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * Event type object with event name strings of {@link Flicking}
 * @example
 * ```ts
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "moveStart"
 * ```
 */
export const EVENTS = {
  /** ready event */
  READY: "ready",
  /** beforeResize event */
  BEFORE_RESIZE: "beforeResize",
  /** afterResize event */
  AFTER_RESIZE: "afterResize",
  /** holdStart event */
  HOLD_START: "holdStart",
  /** holdEnd event */
  HOLD_END: "holdEnd",
  /** moveStart event */
  MOVE_START: "moveStart",
  /** move event */
  MOVE: "move",
  /** moveEnd event */
  MOVE_END: "moveEnd",
  /** willChange event */
  WILL_CHANGE: "willChange",
  /** changed event */
  CHANGED: "changed",
  /** willRestore event */
  WILL_RESTORE: "willRestore",
  /** restored event */
  RESTORED: "restored",
  /** select event */
  SELECT: "select",
  /** needPanel event */
  NEED_PANEL: "needPanel",
  /** visibleChange event */
  VISIBLE_CHANGE: "visibleChange",
  /** reachEdge event */
  REACH_EDGE: "reachEdge",
  /**
   * panelChange event
   * @since 4.1.0
   */
  PANEL_CHANGE: "panelChange"
} as const;
