/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { FlickingOption } from "~/Flicking";
import FlickingError from "~/core/FlickingError";
import * as ERROR from "~/const/error";
import { ALIGN } from "~/const/external";
import { Merged, ElementLike } from "~/type/internal";

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

  if (typeof el === "string") {
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
    } else {
      elements.push(el);
    }
  });

  return elements;
};

export const isString = (value: any): value is string => typeof value === "string";

export const hasClass = (element: HTMLElement, className: string): boolean => {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return (element.className.split(" ").indexOf(className) >= 0);
  }
};

export const range = (end: number): number[] => {
  if (!end || end <= 0) {
    return [];
  }

  return (Array.apply(0, Array(end)) as number[]).map((_, idx) => idx);
};

export const clamp = (x: number, min: number, max: number) => Math.max(Math.min(x, max), min);

export const toArray = <T>(iterable: ArrayLike<T>): T[] => [].slice.call(iterable) as T[];

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const isArray = (arr: any): boolean => arr && arr.constructor === Array;

export const parseAlign = (align: FlickingOption["align"], size: number): number => {
  let alignPoint: number | null;
  if (typeof align === "string") {
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

export const parseBounce = (bounce: FlickingOption["bounce"], size: number): number[] => {
  let parsedBounce: Array<number | null>;

  if (isArray(bounce)) {
    parsedBounce = (bounce as string[]).map(val => parseArithmeticExpression(val, size));
  } else {
    const parsedVal = parseArithmeticExpression(bounce as number | string, size);

    parsedBounce = [parsedVal, parsedVal];
  }

  for (const val of parsedBounce) {
    if (val == null) {
      throw new FlickingError(ERROR.MESSAGE.WRONG_OPTION("bounce", bounce), ERROR.CODE.WRONG_OPTION);
    }
  }

  return parsedBounce as number[];
};

export const parseArithmeticExpression = (cssValue: number | string, base: number): number | null => {
  const cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

  if (typeof cssValue === "number") {
    return clamp(cssValue, 0, base);
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

  // Clamp between 0 ~ base
  return clamp(calculatedValue, 0, base);
};

// export const getProgress = (pos: number, range: number[]) => {
//   // start, anchor, end
//   // -1 , 0 , 1
//   const [min, center, max] = range;

//   if (pos > center && (max - center)) {
//     // 0 ~ 1
//     return (pos - center) / (max - center);
//   } else if (pos < center && (center - min)) {
//     // -1 ~ 0
//     return (pos - center) / (center - min);
//   } else if (pos !== center && max - min) {
//     return (pos - min) / (max - min);
//   }
//   return 0;
// };

// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /**
//  * Decorator that makes the method of flicking available in the framework.
//  *
//  * @ko 프레임워크에서 플리킹의 메소드를 사용할 수 있게 하는 데코레이터.
//  * @memberof eg.Flicking
//  * @private
//  * @example
//  * ```js
//  * import Flicking, { withFlickingMethods } from "@egjs/flicking";
//  *
//  * class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
//  *   &#64;withFlickingMethods
//  *   private flicking: Flicking;
//  * }
//  * ```
//  */
// export const withFlickingMethods = (prototype: any, flickingName: string) => {
//   Object.keys(FLICKING_METHODS).forEach((name: keyof Flicking) => {
//     if (prototype[name]) {
//       return;
//     }
//     prototype[name] = function(...args) {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//       const result = this[flickingName][name](...args);

//       // fix `this` type to return your own `flicking` instance to the instance using the decorator.
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//       return result === this[flickingName]
//         ? this
//         : result;
//     };
//   });
// };
// /* eslint-enable @typescript-eslint/no-unsafe-member-access */
// /* eslint-enable @typescript-eslint/no-unsafe-assignment */
