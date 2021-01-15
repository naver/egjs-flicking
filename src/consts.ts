/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { FlickingOptions, EventType, Direction, AxesEventType, StateType, MoveTypeSnapOption, MoveTypeFreeScrollOption, FlickingMethodsKeys } from "./types";

export const MOVE_TYPE: {
  SNAP: "snap";
  FREE_SCROLL: "freeScroll";
} = {
  SNAP: "snap",
  FREE_SCROLL: "freeScroll"
};

export const DEFAULT_MOVE_TYPE_OPTIONS: {
  snap: MoveTypeSnapOption;
  freeScroll: MoveTypeFreeScrollOption;
} = {
  snap: {
    type: "snap",
    count: 1
  },
  freeScroll: {
    type: "freeScroll"
  }
};
export const isBrowser = typeof document !== "undefined";

/**
 * Default options for creating Flicking.
 *
 * @ko 플리킹을 만들 때 사용하는 기본 옵션들
 * @private
 * @memberof eg.Flicking
 */
export const DEFAULT_OPTIONS: Readonly<FlickingOptions> = {
  classPrefix: "eg-flick",
  deceleration: 0.0075,
  horizontal: true,
  circular: false,
  infinite: false,
  infiniteThreshold: 0,
  lastIndex: Infinity,
  threshold: 40,
  duration: 100,
  panelEffect: x => 1 - Math.pow(1 - x, 3),
  defaultIndex: 0,
  inputType: ["touch", "mouse"],
  thresholdAngle: 45,
  bounce: 10,
  autoResize: false,
  adaptive: false,
  zIndex: 2000,
  bound: false,
  overflow: false,
  hanger: "50%",
  anchor: "50%",
  gap: 0,
  moveType: DEFAULT_MOVE_TYPE_OPTIONS.snap,
  useOffset: false,
  isEqualSize: false,
  isConstantSize: false,
  renderOnlyVisible: false,
  renderExternal: false,
  resizeOnContentsReady: false,
  iOSEdgeSwipeThreshold: 30,
  collectStatistics: true
};

export const DEFAULT_VIEWPORT_CSS = {
  position: "relative",
  zIndex: DEFAULT_OPTIONS.zIndex as string,
  overflow: "hidden"
};

export const DEFAULT_CAMERA_CSS = {
  width: "100%",
  height: "100%",
  willChange: "transform"
};

export const DEFAULT_PANEL_CSS = {
  position: "absolute"
};

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
export const EVENTS: EventType = {
  HOLD_START: "holdStart",
  HOLD_END: "holdEnd",
  MOVE_START: "moveStart",
  MOVE: "move",
  MOVE_END: "moveEnd",
  CHANGE: "change",
  RESTORE: "restore",
  SELECT: "select",
  NEED_PANEL: "needPanel",
  VISIBLE_CHANGE: "visibleChange",
  CONTENT_ERROR: "contentError"
};

export const AXES_EVENTS: AxesEventType = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ANIMATION_END: "animationEnd",
  FINISH: "finish"
};

export const STATE_TYPE: StateType = {
  IDLE: 0,
  HOLDING: 1,
  DRAGGING: 2,
  ANIMATING: 3,
  DISABLED: 4
};

/**
 * Direction constant - "PREV" or "NEXT"
 *
 * @ko 방향 상수 - "PREV" 또는 "NEXT"
 * @type {object}
 * @property {"PREV"} PREV - Prev direction from current hanger position.<br/>It's `left(←️)` direction when `horizontal: true`.<br/>Or, `up(↑️)` direction when `horizontal: false`.<ko>현재 행어를 기준으로 이전 방향.<br/>`horizontal: true`일 경우 `왼쪽(←️)` 방향.<br/>`horizontal: false`일 경우 `위쪽(↑️)`방향이다.</ko>
 * @property {"NEXT"} NEXT - Next direction from current hanger position.<br/>It's `right(→)` direction when `horizontal: true`.<br/>Or, `down(↓️)` direction when `horizontal: false`.<ko>현재 행어를 기준으로 다음 방향.<br/>`horizontal: true`일 경우 `오른쪽(→)` 방향.<br/>`horizontal: false`일 경우 `아래쪽(↓️)`방향이다.</ko>
 * @example
 * import { DIRECTION } from "@egjs/flicking"
 * DIRECTION.PREV; // "PREV"
 * DIRECTION.NEXT; // "NEXT"
 */
export const DIRECTION: Direction = {
  PREV: "PREV",
  NEXT: "NEXT"
};

export const FLICKING_METHODS: {[key in FlickingMethodsKeys]: true} = {
  prev: true,
  next: true,
  moveTo: true,
  getCamera: true,
  getRenderer: true,
  getViewport: true,
  getControl: true,
  getIndex: true,
  getAllPanels: true,
  getCurrentPanel: true,
  getElement: true,
  getSize: true,
  getPanel: true,
  getPanelCount: true,
  getStatus: true,
  getVisiblePanels: true,
  enableInput: true,
  disableInput: true,
  destroy: true,
  resize: true,
  setStatus: true,
  isPlaying: true
};

// Check whether browser supports transform: translate3d
// https://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
export let checkTranslateSupport = () => {
  const transforms = {
    webkitTransform: "-webkit-transform",
    msTransform: "-ms-transform",
    MozTransform: "-moz-transform", // eslint-disable-line @typescript-eslint/naming-convention
    OTransform: "-o-transform", // eslint-disable-line @typescript-eslint/naming-convention
    transform: "transform"
  };

  if (!isBrowser) {
    return {
      name: transforms.transform,
      has3d: true
    };
  }
  const supportedStyle = document.documentElement.style;
  let transformName = "";
  for (const prefixedTransform in transforms) {
    if (prefixedTransform in supportedStyle) {
      transformName = prefixedTransform;
    }
  }

  if (!transformName) {
    throw new Error("Browser doesn't support CSS3 2D Transforms.");
  }

  const el = document.createElement("div");

  document.documentElement.insertBefore(el, null);

  el.style[transformName] = "translate3d(1px, 1px, 1px)";
  const styleVal = window.getComputedStyle(el).getPropertyValue(transforms[transformName]);

  if (el.parentElement) {
    el.parentElement.removeChild(el);
  }

  const transformInfo = {
    name: transformName,
    has3d: styleVal.length > 0 && styleVal !== "none"
  };

  checkTranslateSupport = () => transformInfo;

  return transformInfo;
};

export const TRANSFORM = checkTranslateSupport();
