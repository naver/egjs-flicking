import { Children, isValidElement } from "react";
import { render } from "@testing-library/svelte";
import VanillaFlicking from "~/Flicking";

import DummyFlicking from "../DummyFlicking";
import FixtureRenderer from "./FixtureRenderer";
import { createSandbox } from "../test-util";

class SvelteFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element) {
    const sandbox = createSandbox("svelte-ui");
    const parsed = this._parseJSX(el);

    sandbox.innerHTML = parsed;

    return document.querySelector("svelte-flicking") as unknown as VanillaFlicking;
  }

  private _parseJSX(el: JSX.Element, isPanel = false): string {
    const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

    if (el.type === DummyFlicking) {
      const replacedChildren = childs.map(child => this._parseJSX(child, true)).join("");

      return `<svelte-flicking>${replacedChildren}</svelte-flicking>`;
    } else if (!isValidElement(el)) {
      return el as unknown as string;
    } else {
      const dom = el as JSX.Element;
      const replacedChildren = childs.map(child => this._parseJSX(child)).join("");
      const { className, children, ...restProps } = dom.props;
      const attrs: {[key: string]: any} = { ...restProps };

      if (className) {
        attrs.class = className;
      }
      const type = isPanel ? "svelte-flicking-panel" : dom.type;

      return `<${type} ${Object.keys(attrs).map(key => `${key}="${attrs[key]}"`)}>${replacedChildren}</${type}>`;
    }
  }
}

export default SvelteFixtureRenderer;
