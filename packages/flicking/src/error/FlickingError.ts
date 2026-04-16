/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { setPrototypeOf } from "../utils";

/**
 * Special type of known error that {@link Flicking} throws.
 * @remarks
 * see {@link FlickingErrors} for possible error codes and explantaion
 * @example
 * ```ts
 * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
 * try {
 *   const flicking = new Flicking(".flicking-viewport")
 * } catch (e) {
 *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
 *     console.error(e.message)
 *   }
 * }
 * ```
 */
class FlickingError extends Error {
  public code: number;

  /**
   * @param message - Error message
   * @param code - Error code
   */
  public constructor(message: string, code: number) {
    super(message);

    setPrototypeOf(this, FlickingError.prototype);
    this.name = "FlickingError";
    this.code = code;
  }
}

export default FlickingError;
