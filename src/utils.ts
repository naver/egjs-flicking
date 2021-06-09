/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { FlickingOptions } from "./Flicking";
import FlickingError from "./core/FlickingError";
import * as ERROR from "./const/error";
import { ALIGN, DIRECTION } from "./const/external";
import { LiteralUnion, Merged, ValueOf } from "./type/internal";
import { ElementLike } from "./type/external";

// eslint-disable-next-line @typescript-eslint/ban-types
export const merge = <From extends object, To extends object>(target: From, ...sources: To[]): Merged<From, To> => {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      target[key] = source[key] as unknown;
    });
  });

  return target as Merged<From, To>;
};

export const getElement = (el: HTMLElement | string | null, parent?: HTMLElement): HTMLElement => {
  let targetEl: HTMLElement | null = null;

  if (isString(el)) {
    const parentEl = parent ? parent : document;
    const queryResult = parentEl.querySelector(el);
    if (!queryResult) {
      throw new FlickingError(ERROR.MESSAGE.ELEMENT_NOT_FOUND(el), ERROR.CODE.ELEMENT_NOT_FOUND);
    }
    targetEl = queryResult as HTMLElement;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }

  if (!targetEl) {
    throw new FlickingError(ERROR.MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODE.WRONG_TYPE);
  }

  return targetEl;
};

export const checkExistence = (value: any, nameOnErrMsg: string) => {
  if (value == null) {
    throw new FlickingError(ERROR.MESSAGE.VAL_MUST_NOT_NULL(value, nameOnErrMsg), ERROR.CODE.VAL_MUST_NOT_NULL);
  }
};

export const clamp = (x: number, min: number, max: number) => Math.max(Math.min(x, max), min);

export const getFlickingAttached = (val: Flicking | null, nameToThrowOnError: string): Flicking => {
  if (!val) {
    throw new FlickingError(ERROR.MESSAGE.NOT_ATTACHED_TO_FLICKING(nameToThrowOnError), ERROR.CODE.NOT_ATTACHED_TO_FLICKING);
  }

  return val;
};

export const toArray = <T>(iterable: ArrayLike<T>): T[] => [].slice.call(iterable) as T[];

export const parseAlign = (align: LiteralUnion<ValueOf<typeof ALIGN>> | number, size: number): number => {
  let alignPoint: number | null;
  if (isString(align)) {
    switch (align) {
      case ALIGN.PREV:
        alignPoint = 0;
        break;
      case ALIGN.CENTER:
        alignPoint = 0.5 * size;
        break;
      case ALIGN.NEXT:
        alignPoint = size;
        break;
      default:
        alignPoint = parseArithmeticExpression(align, size);
        if (alignPoint == null) {
          throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("align", align), ERROR.CODE.WRONG_OPTION);
        }
    }
  } else {
    alignPoint = align as number;
  }

  return alignPoint;
};

export const parseBounce = (bounce: FlickingOptions["bounce"], size: number): number[] => {
  let parsedBounce: Array<number | null>;

  if (Array.isArray(bounce)) {
    parsedBounce = (bounce as string[]).map(val => parseArithmeticExpression(val, size));
  } else {
    const parsedVal = parseArithmeticExpression(bounce, size);

    parsedBounce = [parsedVal, parsedVal];
  }

  return parsedBounce.map(val => {
    if (val == null) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("bounce", bounce), ERROR.CODE.WRONG_OPTION);
    }
    return val;
  });
};

export const parseArithmeticExpression = (cssValue: number | string, base: number): number | null => {
  const cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

  if (typeof cssValue === "number") {
    return cssValue;
  }

  let idx = 0;
  let calculatedValue = 0;
  let matchResult = cssRegex.exec(cssValue);
  while (matchResult != null) {
    let sign = matchResult[1];
    const value = matchResult[2];
    const unit = matchResult[3];

    let parsedValue = parseFloat(value);

    if (idx <= 0) {
      sign = sign || "+";
    }

    // Return default value for values not in good form
    if (!sign) {
      return null;
    }

    if (unit === "%") {
      parsedValue = (parsedValue / 100) * base;
    }

    calculatedValue += sign === "+"
      ? parsedValue
      : -parsedValue;

    // Match next occurrence
    ++idx;
    matchResult = cssRegex.exec(cssValue);
  }

  // None-matched
  if (idx === 0) {
    return null;
  }

  return calculatedValue;
};

export const parseCSSSizeValue = (val: string | number): string => isString(val) ? val : `${val}px`;

export const getDirection = (start: number, end: number): ValueOf<typeof DIRECTION> => {
  if (start === end) return DIRECTION.NONE;
  return start < end ? DIRECTION.NEXT : DIRECTION.PREV;
};

export const parseElement = (element: ElementLike | ElementLike[]): HTMLElement[] => {
  if (!Array.isArray(element)) {
    element = [element];
  }

  const elements: HTMLElement[] = [];
  element.forEach(el => {
    if (isString(el)) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = el;

      elements.push(...toArray(tempDiv.children) as HTMLElement[]);
      while (tempDiv.firstChild) {
        tempDiv.removeChild(tempDiv.firstChild);
      }
    } else if (el && el.nodeType === Node.ELEMENT_NODE) {
      elements.push(el);
    } else {
      throw new FlickingError(ERROR.MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), ERROR.CODE.WRONG_TYPE);
    }
  });

  return elements;
};

export const getMinusCompensatedIndex = (idx: number, max: number) => idx < 0 ? clamp(idx + max, 0, max) : clamp(idx, 0, max);

export const includes = <T>(array: T[], target: any): target is T => {
  for (const val of array) {
    if (val === target) return true;
  }
  return false;
};

export const isString = (val: any): val is string => typeof val === "string";

export const circulatePosition = (pos: number, min: number, max: number) => {
  const size = max - min;

  if (pos < min) {
    const offset = (min - pos) % size;
    pos = max - offset;
  } else if (pos > max) {
    const offset = (pos - max) % size;
    pos = min + offset;
  }

  return pos;
};

export const find = <T>(array: T[], checker: (val: T) => boolean): T | null => {
  for (const val of array) {
    if (checker(val)) {
      return val;
    }
  }

  return null;
};

export const findRight = <T>(array: T[], checker: (val: T) => boolean): T | null => {
  for (let idx = array.length - 1; idx >= 0; idx--) {
    const val = array[idx];
    if (checker(val)) {
      return val;
    }
  }

  return null;
};

export const findIndex = <T>(array: T[], checker: (val: T) => boolean): number => {
  for (let idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }

  return -1;
};

export const getProgress = (pos: number, prev: number, next: number) => (pos - prev) / (next - prev);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const getStyle = (el: HTMLElement): CSSStyleDeclaration => window.getComputedStyle(el) || (el as any).currentStyle as CSSStyleDeclaration;
