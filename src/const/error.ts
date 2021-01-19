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
 * @property {number} WRONG_OPTION 3
 */
export const CODE: {
  [key in keyof typeof MESSAGE]: number;
} = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  VAL_MUST_NOT_NULL: 2,
  NOT_ATTACHED_TO_FLICKING: 3,
  WRONG_OPTION: 4
};

export const MESSAGE = {
  WRONG_TYPE: (wrongVal: any, correctTypes: string[]) => `${wrongVal}(${typeof wrongVal}) is not a ${correctTypes.map(type => `"${type}"`).join(" or ")}.`,
  ELEMENT_NOT_FOUND: (selector: string) => `Element with selector "${selector}" not found.`,
  VAL_MUST_NOT_NULL: (val: any, name: string) => `${name} should be provided. Given: ${val}`,
  NOT_ATTACHED_TO_FLICKING: (name: any) => `${name} is not attached to the Flicking instance.`,
  WRONG_OPTION: (optionName: string, val: any) => `Option "${optionName}" is not formatted properly, given: ${val}`
};
