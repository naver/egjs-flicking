import Flicking from "@egjs/flicking";
import { Children } from "react";

import DummyFlicking, { DEFAULT_PROPS } from "../fixture/DummyFlicking";

export { cleanup, createSandbox, waitEvent } from "../../shared/utils";

export const findFlickingJSX = (el: JSX.Element): JSX.Element | null => {
  const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    return el as unknown as JSX.Element;
  }

  for (const child of children) {
    const found = findFlickingJSX(child);
    if (found) {
      return found;
    }
  }

  return null;
};

export const resolveFlickingWhenReady = async (flicking: Flicking): Promise<Flicking> => {
  const autoInit = flicking.autoInit ?? true;

  if (autoInit) {
    return new Promise(resolve => {
      flicking.once("ready", () => {
        resolve(flicking);
      });
    });
  } else {
    return Promise.resolve(flicking);
  }
};

export const flattenAttrs = (
  el: JSX.Element,
  {
    formatProp = (name: string, val: any) => `${name}="${val}"`
  }: Partial<{
    formatProp: (name: string, val: any) => string;
  }> = {}
): string[] => {
  const { className, children, ...otherProps } = el.props;
  const attrs = [];

  for (const propName in DEFAULT_PROPS) {
    delete otherProps[propName];
  }

  if (className) {
    attrs.push(formatProp("class", className));
  }

  for (const key in otherProps) {
    attrs.push(formatProp(key, otherProps[key]));
  }

  return attrs;
};
