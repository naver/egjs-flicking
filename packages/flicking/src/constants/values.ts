/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * An object with all possible predefined literal string for the {@link Flicking.align | align} option
 */
export const ALIGN = {
  /** left/top align */
  PREV: "prev",
  /** center align */
  CENTER: "center",
  /** right/bottom align */
  NEXT: "next"
} as const;

/**
 * An object of directions
 */
export const DIRECTION = {
  /** "left" when {@link Flicking.horizontal | horizontal} is true, and "top" when {@link Flicking.horizontal | horizontal} is false */
  PREV: "PREV",
  /** "right" when {@link Flicking.horizontal | horizontal} is true, and "bottom" when {@link Flicking.horizontal | horizontal} is false */
  NEXT: "NEXT",
  /** This value usually means it's the same position */
  NONE: null
} as const;

/**
 * An object with all possible {@link Flicking.moveType | moveType}s
 */
export const MOVE_TYPE = {
  /** Flicking's {@link Flicking.moveType | moveType} that enables {@link SnapControl} as a Flicking's {@link Flicking.control | control} */
  SNAP: "snap",
  /** Flicking's {@link Flicking.moveType | moveType} that enables {@link FreeControl} as a Flicking's {@link Flicking.control | control} */
  FREE_SCROLL: "freeScroll",
  /** Flicking's {@link Flicking.moveType | moveType} that enables {@link StrictControl} as a Flicking's {@link Flicking.control | control} */
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
 * An object with all possible {@link Flicking.circularFallback | circularFallback}s
 */
export const CIRCULAR_FALLBACK = {
  /** "linear" */
  LINEAR: "linear",
  /** "bound" */
  BOUND: "bound"
} as const;

/**
 * An object for identifying {@link https://developer.mozilla.org/en-US/docs/Web/CSS/direction | direction} CSS property applied to the camera element(`.flicking-camera`)
 */
export const ORDER = {
  /** "ltr" */
  LTR: "ltr",
  /** "rtl" */
  RTL: "rtl"
} as const;

/**
 * An object that contains the direction that {@link Flicking} is moving
 */
export const MOVE_DIRECTION = {
  /** horizontal */
  HORIZONTAL: "horizontal",
  /** vertical */
  VERTICAL: "vertical"
} as const;
