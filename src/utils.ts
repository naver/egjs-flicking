import { ElementLike } from "./types";

export function merge(target: object, ...srcs: object[]): object {
  srcs.forEach(source => {
    Object.keys(source).forEach(key => {
      const value = source[key];
      target[key] = value;
    });
  });

  return target;
}

export function parseElement(element: ElementLike | ElementLike[]): HTMLElement[] {
  if (!Array.isArray(element)) {
    element = [element];
  }

  const elements: HTMLElement[] = [];
  element.forEach(el => {
    if (isString(el)) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = el;

      elements.push(...toArray(tempDiv.children) as HTMLElement[]);
    } else {
      elements.push(el as HTMLElement);
    }
  });

  return elements;
}

// Check whether browser supports transform: translate3d
// https://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
export let checkTranslateSupport = () => {
  const transforms = {
    webkitTransform: "-webkit-transform",
    msTransform: "-ms-transform",
    MozTransform: "-moz-transform",
    OTransform: "-o-transform",
    transform: "transform",
  };

  const supportedStyle = document.documentElement.style;
  let transformName = "";
  for (const prefixedTransform in transforms) {
    if (prefixedTransform in supportedStyle) {
      transformName = prefixedTransform;
    }
  }

  if (!transformName) {
    throw new Error("Browser doesn't support CSS3 2D Transforms.");
  }

  const el = document.createElement("div");

  document.documentElement.insertBefore(el, null);

  el.style[transformName] = "translate3d(1px, 1px, 1px)";
  const styleVal = window.getComputedStyle(el).getPropertyValue(transforms[transformName]);

  el.parentElement!.removeChild(el);

  const transformInfo = {
    name: transformName,
    has3d: styleVal.length > 0 && styleVal !== "none",
  };

  checkTranslateSupport = () => transformInfo;

  return transformInfo;
};
export function isString(value: any): value is string {
  return typeof value === "string";
}
// Get class list of element as string array
export function classList(element: HTMLElement): string[] {
  return element.classList
    ? toArray(element.classList)
    : element.className.split(" ");
}

// Add class to specified element
export function addClass(element: HTMLElement, className: string): void {
  if (element.classList) {
    element.classList.add(className);
  } else {
    if (element.className.indexOf(className) < 0) {
      element.className = (`${element.className} ${className}`).replace(/\s{2,}/g, " ");
    }
  }
}

export function applyCSS(element: HTMLElement, cssObj: object): void {
  Object.keys(cssObj).forEach(property => {
    element.style[property] = cssObj[property];
  });
}

export function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}

// Min: inclusive, Max: exclusive
export function isBetween(val: number, min: number, max: number) {
  return val >= min && val <= max;
}

export interface ArrayLike<T> {
  length: number;
  [index: number]: T;
}

export function toArray<T>(iterable: ArrayLike<T>): T[] {
  return [].slice.call(iterable);
}

export function isArray(arr: any): boolean {
  return arr && arr.constructor === Array;
}

export function parseArithmeticExpression(cssValue: number | string, base: number, defaultVal?: number): number {
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
}

export function getProgress(pos: number, range: number[]) {
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
}

export function findIndex<T>(iterable: T[], callback: (el: T) => boolean): number {
  for (let i = 0; i < iterable.length; i += 1) {
    const element = iterable[i];
    if (element && callback(element)) {
      return i;
    }
  }

  return -1;
}

// return [0, 1, ...., max - 1]
export function counter(max: number): number[] {
  const counterArray: number[] = [];
  for (let i = 0; i < max; i += 1) {
    counterArray[i] = i;
  }
  return counterArray;
}

// Circulate number between range [min, max]
/*
 * "indexed" means min and max is not same, so if it's true "min - 1" should be max
 * While if it's false, "min - 1" should be "max - 1"
 * use `indexed: true` when it should be used for circulating integers like index
 * or `indexed: false` when it should be used for something like positions.
 */
export function circulate(value: number, min: number, max: number, indexed: boolean): number {
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
}
