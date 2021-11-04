import { Children, cloneElement, createRef, isValidElement, RefObject } from "react";
import { render } from "@testing-library/react";
import VanillaFlicking from "~/Flicking";

import DummyFlicking from "../DummyFlicking";
import FixtureRenderer from "./FixtureRenderer";

// FIXME:
class NgxFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element): Promise<VanillaFlicking> {
    const flickingRef = createRef();
    const replaced = this._replaceFlickingJSX(el, flickingRef);

    render(replaced);

    return Promise.resolve(flickingRef.current as unknown as VanillaFlicking);
  }

  private _replaceFlickingJSX(el: JSX.Element, flickingRef): JSX.Element {
    const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];
    const replacedChildren = children.map(child => this._replaceFlickingJSX(child, flickingRef));

    if (el.type === DummyFlicking) {
      return <div>{ replacedChildren }</div>;
    } else if (!isValidElement(el)) {
      return el;
    } else {
      return cloneElement(el, el.props, replacedChildren);
    }
  }
}

export default NgxFixtureRenderer;
