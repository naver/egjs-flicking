import { Children, cloneElement, createRef, isValidElement, RefObject } from "react";
import { render } from "@testing-library/react";
import VanillaFlicking from "@egjs/flicking";
import Flicking from "@egjs/react-flicking";

import DummyFlicking from "../DummyFlicking";
import FixtureRenderer from "./FixtureRenderer";

class ReactFixtureRenderer implements FixtureRenderer {
  public async render(el: JSX.Element) {
    const flickingRef = createRef<Flicking>();
    const replaced = this._replaceFlickingJSX(el, flickingRef);

    render(replaced);

    return Promise.resolve(flickingRef.current as unknown as VanillaFlicking);
  }

  private _replaceFlickingJSX(el: JSX.Element, flickingRef: RefObject<Flicking>): JSX.Element {
    const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];
    const replacedChildren = children.map(child => this._replaceFlickingJSX(child, flickingRef));

    if (el.type === DummyFlicking) {
      return <Flicking ref={flickingRef} key="flicking" viewportTag={el.props.tag} cameraTag={el.props.cameraTag} {...el.props.options}>{ replacedChildren }</Flicking>;
    } else if (!isValidElement(el)) {
      return el;
    } else {
      return cloneElement(el, el.props, replacedChildren);
    }
  }
}

export default ReactFixtureRenderer;
