/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * List of constants that flicking exports
 * @ko Flicking이 export하는 상수들의 목록
 * @namespace Constants
 * @example
 * ```
 * // esm
 * import { ERROR_CODE } from "@egjs/flicking";
 *
 * // umd
 * Flicking.ERROR_CODE
 * ```
 */
export { CODE as ERROR_CODE } from "./error";

/**
 * Event type object with event name strings.
 * @ko 이벤트 이름 문자열들을 담은 객체
 * @type {object}
 * @property {"holdStart"} HOLD_START - holdStart event<ko>holdStart 이벤트</ko>
 * @property {"holdEnd"} HOLD_END - holdEnd event<ko>holdEnd 이벤트</ko>
 * @property {"moveStart"} MOVE_START - moveStart event<ko>moveStart 이벤트</ko>
 * @property {"move"} MOVE - move event<ko>move 이벤트</ko>
 * @property {"moveEnd"} MOVE_END - moveEnd event<ko>moveEnd 이벤트</ko>
 * @property {"willChange"} WILL_CHANGE - willChange event<ko>willChange 이벤트</ko>
 * @property {"changed"} CHANGED - changed event<ko>changed 이벤트</ko>
 * @property {"willRestore"} WILL_RESTORE - willRestore event<ko>willRestore 이벤트</ko>
 * @property {"restored"} RESTORED - restored event<ko>restored 이벤트</ko>
 * @property {"select"} SELECT - select event<ko>select 이벤트</ko>
 * @property {"needPanel"} NEED_PANEL - needPanel event<ko>needPanel 이벤트</ko>
 * @example
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "MOVE_START"
 */
export const EVENTS = {
  READY: "ready",
  BEFORE_RESIZE: "beforeResize",
  AFTER_RESIZE: "afterResize",
  HOLD_START: "holdStart",
  HOLD_END: "holdEnd",
  MOVE_START: "moveStart",
  MOVE: "move",
  MOVE_END: "moveEnd",
  WILL_CHANGE: "willChange",
  CHANGED: "changed",
  WILL_RESTORE: "willRestore",
  RESTORED: "restored",
  SELECT: "select",
  NEED_PANEL: "needPanel",
  VISIBLE_CHANGE: "visibleChange",
  REACH_EDGE: "reachEdge"
} as const;

/**
 * @memberof Constants
 */
export const ALIGN = {
  PREV: "prev",
  CENTER: "center",
  NEXT: "next"
} as const;

/**
 * @memberof Constants
 */
export const DIRECTION = {
  PREV: "PREV",
  NEXT: "NEXT",
  NONE: null
} as const;

/**
 * @memberof Constants
 */
export const MOVE_TYPE = {
  SNAP: "snap",
  FREE_SCROLL: "freeScroll"
} as const;
