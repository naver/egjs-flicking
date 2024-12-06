/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
export { CODE as ERROR_CODE } from "./error";

/**
 * Event type object with event name strings of {@link Flicking}
 * @ko {@link Flicking}의 이벤트 이름 문자열들을 담은 객체
 * @type {object}
 * @property {"holdStart"} HOLD_START holdStart event<ko>holdStart 이벤트</ko>
 * @property {"holdEnd"} HOLD_END holdEnd event<ko>holdEnd 이벤트</ko>
 * @property {"moveStart"} MOVE_START moveStart event<ko>moveStart 이벤트</ko>
 * @property {"move"} MOVE move event<ko>move 이벤트</ko>
 * @property {"moveEnd"} MOVE_END moveEnd event<ko>moveEnd 이벤트</ko>
 * @property {"willChange"} WILL_CHANGE willChange event<ko>willChange 이벤트</ko>
 * @property {"changed"} CHANGED changed event<ko>changed 이벤트</ko>
 * @property {"willRestore"} WILL_RESTORE willRestore event<ko>willRestore 이벤트</ko>
 * @property {"restored"} RESTORED restored event<ko>restored 이벤트</ko>
 * @property {"select"} SELECT select event<ko>select 이벤트</ko>
 * @property {"needPanel"} NEED_PANEL needPanel event<ko>needPanel 이벤트</ko>
 * @property {"panelChange"} PANEL_CHANGE panelChange event<ko>panelChange 이벤트</ko>
 * @example
 * ```ts
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "moveStart"
 * ```
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
  REACH_EDGE: "reachEdge",
  PANEL_CHANGE: "panelChange"
} as const;

/**
 * An object with all possible predefined literal string for the {@link Flicking#align align} option
 * @ko {@link Flicking#align align} 옵션에 사용되는 미리 정의된 리터럴 상수들을 담고 있는 객체
 * @type {object}
 * @property {"prev"} PREV left/top align<ko>좌/상 정렬</ko>
 * @property {"center"} CENTER center align<ko>중앙 정렬</ko>
 * @property {"next"} NEXT right/bottom align<ko>우/하 정렬</ko>
 */
export const ALIGN = {
  PREV: "prev",
  CENTER: "center",
  NEXT: "next"
} as const;

/**
 * An object of directions
 * @ko 방향을 나타내는 값들을 담고 있는 객체
 * @type {object}
 * @property {"PREV"} PREV "left" when {@link Flicking#horizontal horizontal} is true, and "top" when {@link Flicking#horizontal horizontal} is false
 * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 왼쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 위쪽을 의미합니다</ko>
 * @property {"NEXT"} NEXT "right" when {@link Flicking#horizontal horizontal} is true, and "bottom" when {@link Flicking#horizontal horizontal} is false
 * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 오른쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 아래쪽을 의미합니다</ko>
 * @property {null} NONE This value usually means it's the same position<ko>주로 제자리인 경우를 의미합니다</ko>
 */
export const DIRECTION = {
  PREV: "PREV",
  NEXT: "NEXT",
  NONE: null
} as const;

/**
 * An object with all possible {@link Flicking#moveType moveType}s
 * @ko Flicking이 제공하는 {@link Flicking#moveType moveType}들을 담고 있는 객체
 * @type {object}
 * @property {"snap"} SNAP Flicking's {@link Flicking#moveType moveType} that enables {@link SnapControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking의 {@link Flicking#control control}을 {@link SnapControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
 * @property {"freeScroll"} FREE_SCROLL Flicking's {@link Flicking#moveType moveType} that enables {@link FreeControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking의 {@link Flicking#control control}을 {@link FreeControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
 * @property {"strict"} STRICT Flicking's {@link Flicking#moveType moveType} that enables {@link StrictControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking의 {@link Flicking#control control}을 {@link StrictControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
 */
export const MOVE_TYPE = {
  SNAP: "snap",
  FREE_SCROLL: "freeScroll",
  STRICT: "strict"
} as const;

export const CLASS = {
  VIEWPORT: "flicking-viewport",
  CAMERA: "flicking-camera",
  VERTICAL: "vertical",
  HIDDEN: "flicking-hidden",
  DEFAULT_VIRTUAL: "flicking-panel"
};

/**
 * An object with all possible {@link Flicking#circularFallback circularFallback}s
 * @ko Flicking의 {@link Flicking#circularFallback circularFallback}에 설정 가능한 값들을 담고 있는 객체
 * @type {object}
 * @property {string} LINEAR "linear"
 * @property {string} BOUND "bound"
 */
export const CIRCULAR_FALLBACK = {
  LINEAR: "linear",
  BOUND: "bound"
} as const;

/**
 * An object for identifying {@link https://developer.mozilla.org/en-US/docs/Web/CSS/direction direction} CSS property applied to the camera element(`.flicking-camera`)
 * @ko 카메라 엘리먼트(`.flicking-camera`)에 적용된 {@link https://developer.mozilla.org/en-US/docs/Web/CSS/direction direction} CSS 속성을 구분하기 위한 객체
 * @type {object}
 * @property {string} LTR "ltr"
 * @property {string} RTL "rtl"
 */
export const ORDER = {
  LTR: "ltr",
  RTL: "rtl"
} as const;

/**
 * An object that contains the direction that {@link Flicking} is moving
 * @ko {@link Flicking}이 움직이는 방향을 담고 있는 객체
 * @type {object}
 * @property {"horizontal"} HORIZONTAL horizontal<ko>수평 방향</ko>
 * @property {"vertical"} VERTICAL vertical<ko>수직 방향</ko>
 */
export const MOVE_DIRECTION = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical"
} as const;
