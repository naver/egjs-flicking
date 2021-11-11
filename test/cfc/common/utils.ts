import Flicking from "@egjs/flicking";
import { Children } from "react";

import DummyFlicking from "../fixture/DummyFlicking";

export const createSandbox = (id: string) => {
  const tmp = document.createElement("div");

  tmp.className = "_tempSandbox_";
  tmp.id = id;

  document.body.appendChild(tmp);

  return tmp;
};

export const cleanup = () => {
  const elements: HTMLElement[] = [].slice.call(document.querySelectorAll("._tempSandbox_"));
  elements.forEach(v => {
    v.parentNode.removeChild(v);
  });
};

export const findFlickingJSX = (el: JSX.Element): DummyFlicking | null => {
  const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    return el as unknown as DummyFlicking;
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
