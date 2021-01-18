/**
 * Event type object with event name strings.
 *
 * @ko 이벤트 이름 문자열들을 담은 객체
 * @type {object}
 * @property {"holdStart"} HOLD_START - holdStart event<ko>holdStart 이벤트</ko>
 * @property {"holdEnd"} HOLD_END - holdEnd event<ko>holdEnd 이벤트</ko>
 * @property {"moveStart"} MOVE_START - moveStart event<ko>moveStart 이벤트</ko>
 * @property {"move"} MOVE - move event<ko>move 이벤트</ko>
 * @property {"moveEnd"} MOVE_END - moveEnd event<ko>moveEnd 이벤트</ko>
 * @property {"change"} CHANGE - change event<ko>change 이벤트</ko>
 * @property {"restore"} RESTORE - restore event<ko>restore 이벤트</ko>
 * @property {"select"} SELECT - select event<ko>select 이벤트</ko>
 * @property {"needPanel"} NEED_PANEL - needPanel event<ko>needPanel 이벤트</ko>
 * @example
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "MOVE_START"
 */
export const READY = "ready";
export const RESIZE = "resize";
export const HOLD_START = "holdStart";
export const HOLD_END = "holdEnd";
export const MOVE_START = "moveStart";
export const MOVE = "move";
export const MOVE_END = "moveEnd";
export const CHANGE = "change";
export const RESTORE = "restore";
export const SELECT = "select";
export const NEED_PANEL = "needPanel";
export const VISIBLE_CHANGE = "visibleChange";
export const CONTENT_ERROR = "contentError";
