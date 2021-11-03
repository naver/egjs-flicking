import { Children, isValidElement } from "react";
import VanillaFlicking from "~/Flicking";

import FixtureRenderer from "./FixtureRenderer";
import DummyFlicking from "../DummyFlicking";
import { createSandbox } from "../test-util";

class NgxFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element): Promise<VanillaFlicking> {
    const sandbox = createSandbox("vue-ui");
    const elAsAngularTemplate = this._parseJSX(el);

    sandbox.innerHTML = elAsAngularTemplate;

    console.log(document.querySelector("ngx-flicking"));

    (window as any).flicking = document.querySelector("ngx-flicking")

    return document.querySelector("ngx-flicking") as unknown as VanillaFlicking;
  }

  private _parseJSX(el: JSX.Element, isPanel: boolean = false) {
    const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

    if (!isValidElement(el)) {
      return el;
    } else if (el.type === DummyFlicking) {
      return `<ngx-flicking>${childs.map(child => this._parseJSX(child, true)).join("")}</ngx-flicking>`;
    } else {
      const props = (el.props as any);
      const parsedChildren = childs.map(child => this._parseJSX(child));
      const attrs = [];
      const type = isPanel ? "flicking-panel" : el.type;

      if (props.className) {
        attrs.push(`class="${props.className}"`);
      }

      const { className, children, ...otherProps } = props;

      for (const key in otherProps) {
        attrs.push(`${key}="${otherProps[key]}"`);
      }

      return `<${type} ${attrs.join(" ")}>${parsedChildren.join("")}</${type}>`;
    }
  }
}

export default NgxFixtureRenderer;
