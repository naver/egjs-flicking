/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { ERROR_CODE } from "./codes";

/**
 * Error codes that may be thrown during panel movement operations.
 * @remarks
 * These errors can occur when using navigation methods like {@link Flicking.prev},
 * {@link Flicking.next}, or {@link Flicking.moveTo}.
 *
 * Common scenarios:
 *
 * - `NOT_INITIALIZED`: Attempting to navigate before Flicking is ready
 *
 * - `INDEX_OUT_OF_RANGE`: Target panel index doesn't exist
 *
 * - `POSITION_NOT_REACHABLE`: Target camera position is invalid
 *
 * - `ANIMATION_INTERRUPTED`: User interaction during animation
 *
 * - `ANIMATION_ALREADY_PLAYING`: Starting new animation while one is in progress
 *
 * - `STOP_CALLED_BY_USER`: User prevented navigation via `event.stop()`
 *
 * - `NO_ACTIVE`: No panels available to navigate
 */
export type MovementErrors =
  | typeof ERROR_CODE.NOT_INITIALIZED
  | typeof ERROR_CODE.INDEX_OUT_OF_RANGE
  | typeof ERROR_CODE.POSITION_NOT_REACHABLE
  | typeof ERROR_CODE.ANIMATION_INTERRUPTED
  | typeof ERROR_CODE.ANIMATION_ALREADY_PLAYING
  | typeof ERROR_CODE.STOP_CALLED_BY_USER
  | typeof ERROR_CODE.NO_ACTIVE;

/**
 * Error codes that may be thrown when manipulating the DOM.
 * @remarks
 * These errors can occur when using DOM manipulation methods like
 * {@link Flicking.insert}, {@link Flicking.append}, {@link Flicking.prepend},
 * {@link Flicking.replace}, or {@link Flicking.remove}.
 *
 * Common scenarios:
 *
 * - `NOT_ATTACHED_TO_FLICKING`: Component not properly initialized
 *
 * - `ELEMENT_NOT_FOUND`: Invalid CSS selector or element doesn't exist
 *
 * - `VAL_MUST_NOT_NULL`: Required parameter is null/undefined
 *
 * - `WRONG_TYPE`: Invalid parameter type
 *
 * - `INDEX_OUT_OF_RANGE`: Target index doesn't exist
 *
 * - `NOT_ALLOWED_IN_FRAMEWORK`: Using DOM methods in React/Vue/Angular
 *
 * - `NOT_ALLOWED_IN_VIRTUAL`: Using DOM methods with virtual mode enabled
 * @public
 */
export type DOMManipulationErrors =
  | typeof ERROR_CODE.NOT_ATTACHED_TO_FLICKING
  | typeof ERROR_CODE.ELEMENT_NOT_FOUND
  | typeof ERROR_CODE.VAL_MUST_NOT_NULL
  | typeof ERROR_CODE.WRONG_TYPE
  | typeof ERROR_CODE.INDEX_OUT_OF_RANGE
  | typeof ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK
  | typeof ERROR_CODE.NOT_ALLOWED_IN_VIRTUAL;

/**
 * Error codes that may be thrown during Flicking initialization.
 * @remarks
 * These errors can occur when creating a new Flicking instance or calling {@link Flicking.init}.
 *
 * Common scenarios:
 *
 * - `ELEMENT_NOT_FOUND`: Viewport element doesn't exist in DOM
 *
 * - `WRONG_OPTION`: Invalid configuration option value
 *
 * - `TRANSFORM_NOT_SUPPORTED`: Browser doesn't support CSS transforms (IE8 and below)
 * @public
 */
export type InitializationErrors =
  | typeof ERROR_CODE.ELEMENT_NOT_FOUND
  | typeof ERROR_CODE.WRONG_OPTION
  | typeof ERROR_CODE.TRANSFORM_NOT_SUPPORTED;

/**
 * Error codes that may be thrown during animation updates.
 * @remarks
 * These errors can occur when calling {@link Flicking.update} to manually update
 * the animation state.
 *
 * Common scenarios:
 *
 * - `NOT_INITIALIZED`: Calling update before Flicking is ready
 *
 * - `ANIMATION_INTERRUPTED`: User interrupted the animation during update
 * @public
 */
export type AnimationUpdateErrors = typeof ERROR_CODE.NOT_INITIALIZED | typeof ERROR_CODE.ANIMATION_INTERRUPTED;

/**
 * Error codes that may be thrown when restoring Flicking status.
 * @remarks
 * These errors can occur when using {@link Flicking.setStatus} to restore
 * a previously saved status (from {@link Flicking.getStatus}).
 *
 * Common scenarios:
 *
 * - `NOT_INITIALIZED`: Attempting to restore before initialization
 *
 * - `INDEX_OUT_OF_RANGE`: Saved status references non-existent panel
 *
 * - `POSITION_NOT_REACHABLE`: Saved position is no longer valid
 * @public
 */
export type StatusRestoreErrors =
  | typeof ERROR_CODE.NOT_INITIALIZED
  | typeof ERROR_CODE.INDEX_OUT_OF_RANGE
  | typeof ERROR_CODE.POSITION_NOT_REACHABLE;
