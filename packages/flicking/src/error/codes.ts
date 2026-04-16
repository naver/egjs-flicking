/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import type { FlickingErrors } from "./types";

type ErrorKey = keyof FlickingErrors;

/**
 * Internal error catalog containing all error information.
 * @remarks
 * This is the single source of truth for all error codes and messages.
 * Use {@link ERROR_CODE} and {@link MESSAGE} exports for public access.
 * @privateRemarks
 * ## How to add a new error code
 *
 * 1. **Add to this `errors` object:**
 *    ```typescript
 *    NEW_ERROR_NAME: {
 *      code: 15,  // next available number
 *      message: "Error message" // or function for parameterized messages
 *    }
 *    ```
 *
 * 2. **Document in FlickingErrors** (types.ts):
 *    - Add property with same name and type signature
 *    - Write comprehensive TSDoc with @remarks, @example, @see tags
 *    - Include: description, common causes, solutions, wrong/correct examples
 *
 * 3. **Verify:**
 *    - `pnpm build` - check TypeScript compilation
 *    - `pnpm api-docs:docusaurus` - generate documentation
 *    - Check packages/docs/docs/api/interfaces/FlickingErrors.mdx
 *
 * Note: `CODE` and `MESSAGE` exports are auto-generated via reduce, no manual updates needed.
 * @internal
 */
const errors: FlickingErrors = {
  WRONG_TYPE: {
    code: 0,
    message: (wrongVal, correctTypes) =>
      `${wrongVal}(${typeof wrongVal}) is not a ${correctTypes.map(type => `"${type}"`).join(" or ")}.`
  },
  ELEMENT_NOT_FOUND: {
    code: 1,
    message: selector => `Element with selector "${selector}" not found.`
  },
  VAL_MUST_NOT_NULL: {
    code: 2,
    message: (val, name) => `${name} should be provided. Given: ${val}`
  },
  NOT_ATTACHED_TO_FLICKING: {
    code: 3,
    message: 'This module is not attached to the Flicking instance. "init()" should be called first.'
  },
  WRONG_OPTION: {
    code: 4,
    message: (optionName, val) => `Option "${optionName}" is not in correct format, given: ${val}`
  },
  INDEX_OUT_OF_RANGE: {
    code: 5,
    message: (val, min, max) => `Index "${val}" is out of range: should be between ${min} and ${max}.`
  },
  POSITION_NOT_REACHABLE: {
    code: 6,
    message: position => `Position "${position}" is not reachable.`
  },
  TRANSFORM_NOT_SUPPORTED: {
    code: 7,
    message: "Browser does not support CSS transform."
  },
  STOP_CALLED_BY_USER: {
    code: 8,
    message: "Event stop() is called by user."
  },
  ANIMATION_INTERRUPTED: {
    code: 9,
    message: "Animation is interrupted by user input."
  },
  ANIMATION_ALREADY_PLAYING: {
    code: 10,
    message: "Animation is already playing."
  },
  NOT_ALLOWED_IN_FRAMEWORK: {
    code: 11,
    message: "This behavior is not allowed in the frameworks like React, Vue, or Angular."
  },
  NOT_INITIALIZED: {
    code: 12,
    message: "Flicking is not initialized yet, call init() first."
  },
  NO_ACTIVE: {
    code: 13,
    message: "There's no active panel that Flicking has selected. This may be due to the absence of any panels."
  },
  NOT_ALLOWED_IN_VIRTUAL: {
    code: 14,
    message: "This behavior is not allowed when the virtual option is enabled"
  }
};

/**
 * Error codes of {@link FlickingError}.
 * @remarks
 * Each error code represents a specific error condition that can occur during Flicking's lifecycle.
 * Use these codes to identify and handle errors programmatically.
 *
 * For detailed documentation of each error code, see {@link FlickingErrors}.
 * @example
 * ```typescript
 * import {FlickingError, ERROR_CODE} from "@egjs/flicking";
 *
 * try {
 *   flicking.moveTo(999);
 * } catch (err) {
 *   if (err instancof FlickingError && err.code === ERROR_CODE.INDEX_OUT_OF_RANGE) {
 *     console.log(err.message);
 *   }
 * }
 * ```
 * @public
 * @see {@link FlickingErrors} for detailed documentation of each error code
 */
export const CODE = (Object.keys(errors) as ErrorKey[]).reduce(
  (acc, key) => {
    acc[key] = errors[key].code;
    return acc;
  },
  {} as Record<ErrorKey, number>
) as { [K in ErrorKey]: FlickingErrors[K]["code"] };

/**
 * Error message generators for {@link FlickingError}.
 * @remarks
 * These functions generate human-readable error messages for each error code.
 * Used internally by Flicking to create {@link FlickingError} instances with
 * contextual information.
 * @internal
 */
export const MESSAGE = (Object.keys(errors) as ErrorKey[]).reduce(
  (acc, key) => {
    acc[key] = errors[key].message;
    return acc;
  },
  {} as Record<string, any>
) as { [K in ErrorKey]: FlickingErrors[K]["message"] };

/**
 * Alias for {@link CODE}.
 * @remarks
 * Exported as `ERROR_CODE` for semantic clarity when importing.
 * @example
 * ```typescript
 * import { ERROR_CODE } from "@egjs/flicking";
 *
 * if (err.code === ERROR_CODE.INDEX_OUT_OF_RANGE) {
 *   // Handle index error
 * }
 * ```
 * @public
 */
export { CODE as ERROR_CODE };
