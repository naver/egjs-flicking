import { createElement, cloneElement, Children, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Flicking from "@egjs/flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import DummyFlickingProps from "../../fixture/DummyFlickingProps";
import { createSandbox, cleanup, findFlickingJSX, resolveFlickingWhenReady } from "../../common/utils";

const render = async (el: JSX.Element): Promise<Flicking> => {
  const sandbox = createSandbox("vanilla-ui");
  const flickingJSX = findFlickingJSX(el);
  const parsedEl = parseJSX(el);
  const html = renderToStaticMarkup(parsedEl);

  sandbox.innerHTML = html;

  const { options, events, plugins } = flickingJSX.props;

  const flicking = new Flicking(".flicking-viewport", options);

  flicking.on(events);
  flicking.addPlugins(...plugins);

  return resolveFlickingWhenReady(flicking);
};

const parseJSX = (el: JSX.Element): JSX.Element => {
  const childs = Children.toArray(el.props?.children ?? []);
  const parsedChildren = childs.map(child => parseJSX(child as JSX.Element));

  if (!isValidElement(el)) {
    return el;
  } else if (el.type === DummyFlicking) {
    const flickingEl = el as React.ReactElement<DummyFlickingProps>;
    const { options, events, children, cameraTag, tag, ...jsxProps } = flickingEl.props;
    const cameraEl = createElement<Partial<HTMLElement>>(cameraTag, {
      className: "flicking-camera",
      key: "camera"
    }, parsedChildren);
    const viewportEl = createElement<Partial<HTMLElement>>(tag, {
      className: "flicking-viewport",
      key: "viewport",
      ...jsxProps as any
    }, cameraEl);

    return viewportEl;
  } else {
    return cloneElement(el, el.props, parsedChildren);
  }
};

export {
  render,
  cleanup
};
