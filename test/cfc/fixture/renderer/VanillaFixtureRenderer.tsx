import { createElement, cloneElement, Children, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Flicking from "@egjs/flicking";

import DummyFlicking from "../DummyFlicking";
import { createSandbox } from "../../utils";
import FixtureRenderer from "./FixtureRenderer";

class VanillaFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element): Promise<Flicking> {
    const sandbox = createSandbox("vanilla-ui");
    const flickingJSX = this._findFlickingJSX(el);
    const parsedEl = this._parseJSX(el);
    const html = renderToStaticMarkup(parsedEl);

    sandbox.innerHTML = html;

    return Promise.resolve(new Flicking(".flicking-viewport", flickingJSX.props.options));
  }

  private _findFlickingJSX(el: JSX.Element): DummyFlicking {
    const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];

    if (el.type === DummyFlicking) {
      return el as unknown as DummyFlicking;
    }

    for (const child of children) {
      const found = this._findFlickingJSX(child);
      if (found) {
        return found;
      }
    }
  }

  private _parseJSX(el: JSX.Element): JSX.Element {
    const children = Children.toArray(el.props?.children ?? []);
    const parsedChildren = children.map(child => this._parseJSX(child as JSX.Element));

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
  }
}

export default VanillaFixtureRenderer;
