/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Error codes of {@link FlickingError}
 *
 * @name ERROR_CODE
 * @memberof Constants
 * @type object
 * @property {number} WRONG_TYPE 0
 * @property {number} ELEMENT_NOT_FOUND 1
 * @property {number} VAL_MUST_NOT_NULL 2
 * @property {number} NOT_ATTACHED_TO_FLICKING 3
 * @property {number} WRONG_OPTION 4
 * @property {number} INDEX_OUT_OF_RANGE 5
 * @property {number} POSITION_NOT_REACHABLE 6
 * @property {number} TRANSFORM_NOT_SUPPORTED 7
 * @property {number} STOP_CALLED_BY_USER 8
 * @property {number} ANIMATION_INTERRUPTED 9
 * @property {number} ANIMATION_ALREADY_PLAYING 10
 */
export const CODE = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  VAL_MUST_NOT_NULL: 2,
  NOT_ATTACHED_TO_FLICKING: 3,
  WRONG_OPTION: 4,
  INDEX_OUT_OF_RANGE: 5,
  POSITION_NOT_REACHABLE: 6,
  TRANSFORM_NOT_SUPPORTED: 7,
  STOP_CALLED_BY_USER: 8,
  ANIMATION_INTERRUPTED: 9,
  ANIMATION_ALREADY_PLAYING: 10
} as const;

export const MESSAGE = {
  WRONG_TYPE: (wrongVal: any, correctTypes: string[]) => `${wrongVal}(${typeof wrongVal}) is not a ${correctTypes.map(type => `"${type}"`).join(" or ")}.`,
  ELEMENT_NOT_FOUND: (selector: string) => `Element with selector "${selector}" not found.`,
  VAL_MUST_NOT_NULL: (val: any, name: string) => `${name} should be provided. Given: ${val}`,
  NOT_ATTACHED_TO_FLICKING: (name: string) => `${name} is not attached to the Flicking instance. "init()" should be called first.`,
  WRONG_OPTION: (optionName: string, val: any) => `Option "${optionName}" is not in correct format, given: ${val}`,
  INDEX_OUT_OF_RANGE: (val: number, min: number, max: number) => `Index "${val}" is out of range: should be between ${min} and ${max}.`,
  POSITION_NOT_REACHABLE: (position: number) => `Position "${position}" is not reachable.`,
  TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform",
  STOP_CALLED_BY_USER: "Event stop() is called by user",
  ANIMATION_INTERRUPTED: "Animation is interrupted by user input",
  ANIMATION_ALREADY_PLAYING: "Animation is already playing"
} as const;
