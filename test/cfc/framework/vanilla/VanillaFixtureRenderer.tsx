import { createElement, cloneElement, Children, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Flicking from "@egjs/flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { createSandbox } from "../../common/utils";

const render = async (el: JSX.Element): Promise<Flicking> => {
  const sandbox = createSandbox("vanilla-ui");
  const flickingJSX = findFlickingJSX(el);
  const parsedEl = parseJSX(el);
  const html = renderToStaticMarkup(parsedEl);

  sandbox.innerHTML = html;

  return Promise.resolve(new Flicking(".flicking-viewport", flickingJSX.props.options));
};

const findFlickingJSX = (el: JSX.Element): DummyFlicking => {
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
};

const parseJSX = (el: JSX.Element): JSX.Element => {
  const children = Children.toArray(el.props?.children ?? []);
  const parsedChildren = children.map(child => parseJSX(child as JSX.Element));

  if (!isValidElement(el)) {
    return el;
  } else if (el.type === DummyFlicking) {
    const flickingEl = el as unknown as DummyFlicking;
    const cameraEl = createElement<Partial<HTMLElement>>(flickingEl.props.cameraTag, {
      className: "flicking-camera",
      key: "camera"
    }, parsedChildren);
    const viewportEl = createElement<Partial<HTMLElement>>(flickingEl.props.tag, {
      className: "flicking-viewport",
      key: "viewport"
    }, cameraEl);

    return viewportEl;
  } else {
    return cloneElement(el, el.props, parsedChildren);
  }
};

export {
  render
};
