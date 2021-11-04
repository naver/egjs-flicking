import { Children, cloneElement, createRef, isValidElement, RefObject } from "react";
import { render } from "@testing-library/react";
import VanillaFlicking from "~/Flicking";

import DummyFlicking from "../DummyFlicking";
import FixtureRenderer from "./FixtureRenderer";

import { ReactNgWrapper } from "../../libs/dist/libs/react-ng-wrapper/bundles/hybrid-react-ng-wrapper.umd.js";
import { NgxFlickingComponent } from "../../libs/dist/libs/angular-component-library/bundles/hybrid-angular-component-library.umd.js";

console.log(ReactNgWrapper, NgxFlickingComponent);

class NgxHybridFlicking extends ReactNgWrapper<NgxFlickingComponent> {
  public constructor(props) {
    super(props, NgxFlickingComponent as any);
  }
}
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
    const FlickingComp = NgxHybridFlicking as any;

    if (el.type === DummyFlicking) {
      return <FlickingComp>{ replacedChildren }</FlickingComp>;
    } else if (!isValidElement(el)) {
      return el;
    } else {
      return cloneElement(el, el.props, replacedChildren);
    }
  }
}

export default NgxFixtureRenderer;
