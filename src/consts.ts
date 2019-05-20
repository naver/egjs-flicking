/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { FlickingOptions, EventType, Direction, AxesEventType, StateType, MoveTypeSnapOption, MoveTypeFreeScrollOption, FlickingMethodsKeys } from "./types";
import { checkTranslateSupport } from "./utils";

export const MOVE_TYPE: {
  SNAP: "snap";
  FREE_SCROLL: "freeScroll";
} = {
  SNAP: "snap",
  FREE_SCROLL: "freeScroll",
};

export const DEFAULT_MOVE_TYPE_OPTIONS: {
  snap: MoveTypeSnapOption,
  freeScroll: MoveTypeFreeScrollOption,
} = {
  snap: {
    type: "snap",
    count: 1,
  },
  freeScroll: {
    type: "freeScroll",
  },
};

/**
 * Default options for creating Flicking.
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
  renderExternal: false,
};

export const DEFAULT_VIEWPORT_CSS = {
  position: "relative",
  zIndex: DEFAULT_OPTIONS.zIndex,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

export const DEFAULT_CAMERA_CSS = {
  width: "100%",
  height: "100%",
  willChange: "transform",
};

export const DEFAULT_PANEL_CSS = {
  position: "absolute",
};

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
};

export const AXES_EVENTS: AxesEventType = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ANIMATION_END: "animationEnd",
  FINISH: "finish",
};

export const STATE_TYPE: StateType = {
  IDLE: 0,
  HOLDING: 1,
  DRAGGING: 2,
  ANIMATING: 3,
  DISABLED: 4,
};

export const DIRECTION: Direction = {
  PREV: "PREV",
  NEXT: "NEXT",
};
export const FLICKING_METHODS: {[key in FlickingMethodsKeys]: true} = {
  prev: true,
  next: true,
  moveTo: true,
  getIndex: true,
  getAllPanels: true,
  getCurrentPanel: true,
  getElement: true,
  getPanel: true,
  getPanelCount: true,
  getStatus: true,
  getVisiblePanels: true,
  setLastIndex: true,
  enableInput: true,
  disableInput: true,
  destroy: true,
  resize: true,
  setStatus: true,
  addPlugins: true,
  removePlugins: true,
  isPlaying: true,
};
export const TRANSFORM = checkTranslateSupport();
