/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import Flicking from "./Flicking";
import { FLICKING_METHODS } from "./consts";
import { ElementLike, OriginalStyle, BoundingBox, Merged } from "./types";

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
      throw new Error("Base element doesn't exist.");
    }
    targetEl = queryResult as HTMLElement;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }

  if (!targetEl) {
    throw new Error("Element should be provided in string or HTMLElement.");
  }

  return targetEl;
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

// Get class list of element as string array
export const classList = (element: HTMLElement): string[] => element.classList
  ? toArray(element.classList)
  : element.className.split(" ");

// Add class to specified element
export const addClass = (element: HTMLElement, className: string): void => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    if (!hasClass(element, className)) {
      element.className = (`${element.className} ${className}`).replace(/\s{2,}/g, " ");
    }
  }
};

export const hasClass = (element: HTMLElement, className: string): boolean => {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return (element.className.split(" ").indexOf(className) >= 0);
  }
};

export const applyCSS = (element: HTMLElement, cssObj: Partial<{ [key in keyof CSSStyleDeclaration]: CSSStyleDeclaration[key] }>): void => {
  Object.keys(cssObj).forEach(property => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    element.style[property] = cssObj[property];
  });
};

export const clamp = (val: number, min: number, max: number) => Math.max(Math.min(val, max), min);

// FIXME: Min: inclusive, Max: exclusive
export const isBetween = (val: number, min: number, max: number) => val >= min && val <= max;

export const toArray = <T>(iterable: ArrayLike<T>): T[] => [].slice.call(iterable) as T[];

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const isArray = (arr: any): boolean => arr && arr.constructor === Array;

export const parseArithmeticExpression = (cssValue: number | string, base: number, defaultVal?: number): number => {
  // Set base / 2 to default value, if it's undefined
  const defaultValue = defaultVal != null ? defaultVal : base / 2;
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
      return defaultValue;
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
    return defaultValue;
  }

  // Clamp between 0 ~ base
  return clamp(calculatedValue, 0, base);
};

export const getProgress = (pos: number, range: number[]) => {
  // start, anchor, end
  // -1 , 0 , 1
  const [min, center, max] = range;

  if (pos > center && (max - center)) {
    // 0 ~ 1
    return (pos - center) / (max - center);
  } else if (pos < center && (center - min)) {
    // -1 ~ 0
    return (pos - center) / (center - min);
  } else if (pos !== center && max - min) {
    return (pos - min) / (max - min);
  }
  return 0;
};

export const findIndex = <T>(iterable: T[], callback: (el: T) => boolean): number => {
  for (let i = 0; i < iterable.length; i += 1) {
    const element = iterable[i];
    if (element && callback(element)) {
      return i;
    }
  }

  return -1;
};

// return [0, 1, ...., max - 1]
export const counter = (max: number): number[] => {
  const counterArray: number[] = [];
  for (let i = 0; i < max; i += 1) {
    counterArray[i] = i;
  }
  return counterArray;
};

// Circulate number between range [min, max]
/*
 * "indexed" means min and max is not same, so if it's true "min - 1" should be max
 * While if it's false, "min - 1" should be "max - 1"
 * use `indexed: true` when it should be used for circulating integers like index
 * or `indexed: false` when it should be used for something like positions.
 */
export const circulate = (value: number, min: number, max: number, indexed: boolean): number => {
  const size = indexed
    ? max - min + 1
    : max - min;
  if (value < min) {
    const offset = indexed
      ? (min - value - 1) % size
      : (min - value) % size;
    value = max - offset;
  } else if (value > max) {
    const offset = indexed
      ? (value - max - 1) % size
      : (value - max) % size;
    value = min + offset;
  }

  return value;
};

export const restoreStyle = (element: HTMLElement, originalStyle: OriginalStyle): void => {
  if (originalStyle.className) {
    element.setAttribute("class", originalStyle.className);
  } else {
    element.removeAttribute("class");
  }

  if (originalStyle.style) {
    element.setAttribute("style", originalStyle.style);
  } else {
    element.removeAttribute("style");
  }
};

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Decorator that makes the method of flicking available in the framework.
 *
 * @ko 프레임워크에서 플리킹의 메소드를 사용할 수 있게 하는 데코레이터.
 * @memberof eg.Flicking
 * @private
 * @example
 * ```js
 * import Flicking, { withFlickingMethods } from "@egjs/flicking";
 *
 * class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
 *   &#64;withFlickingMethods
 *   private flicking: Flicking;
 * }
 * ```
 */
export const withFlickingMethods = (prototype: any, flickingName: string) => {
  Object.keys(FLICKING_METHODS).forEach((name: keyof Flicking) => {
    if (prototype[name]) {
      return;
    }
    prototype[name] = function(...args) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const result = this[flickingName][name](...args);

      // fix `this` type to return your own `flicking` instance to the instance using the decorator.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return result === this[flickingName]
        ? this
        : result;
    };
  });
};
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */

export const getBbox = (element: HTMLElement, useOffset: boolean) => {
  let bbox: BoundingBox;
  if (useOffset) {
    bbox = {
      x: 0,
      y: 0,
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  } else {
    const clientRect = element.getBoundingClientRect();
    bbox = {
      x: clientRect.left,
      y: clientRect.top,
      width: clientRect.width,
      height: clientRect.height
    };
  }
  return bbox;
};
