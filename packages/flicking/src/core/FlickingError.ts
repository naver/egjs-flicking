/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { setPrototypeOf } from "../utils";

/**
 * Special type of known error that {@link Flicking} throws.
 * @ko Flicking 내부에서 알려진 오류 발생시 throw되는 에러
 * @property {number} code Error code<ko>에러 코드</ko>
 * @property {string} message Error message<ko>에러 메시지</ko>
 * @see {@link ERROR_CODE ERROR_CODE}
 * @example
 * ```ts
 * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
 * try {
 *   const flicking = new Flicking(".flicking-viewport")
 * } catch (e) {
 *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
 *     console.error("Element not found")
 *   }
 * }
 * ```
 */
class FlickingError extends Error {
  public code: number;

  /**
   * @param message Error message<ko>에러 메시지</ko>
   * @param code Error code<ko>에러 코드</ko>
   */
  public constructor(message: string, code: number) {
    super(message);

    setPrototypeOf(this, FlickingError.prototype);
    this.name = "FlickingError";
    this.code = code;
  }
}

export default FlickingError;
