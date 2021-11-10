import { toChildArray, cloneElement, createRef, isValidElement, RefObject } from "preact";
import { render as renderPreactComponent, cleanup } from "@testing-library/preact";
import VanillaFlicking from "@egjs/flicking";
import Flicking from "@egjs/preact-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";

const render = async (el: JSX.Element) => {
  const flickingRef = createRef<Flicking>();
  const replaced = replaceFlickingJSX(el, flickingRef);

  renderPreactComponent(replaced);

  return Promise.resolve(flickingRef.current as unknown as VanillaFlicking);
};

const replaceFlickingJSX = (el: JSX.Element, flickingRef: RefObject<Flicking>): JSX.Element => {
  const children = toChildArray(el.props?.children ?? []) as JSX.Element[];
  const replacedChildren = children.map(child => replaceFlickingJSX(child, flickingRef));

  if (el.type === DummyFlicking) {
    const PreactFlicking = Flicking as any;

    return <PreactFlicking ref={flickingRef} key="flicking" viewportTag={el.props.tag} cameraTag={el.props.cameraTag} {...el.props.options}>{ replacedChildren }</PreactFlicking>;
  } else if (!isValidElement(el)) {
    return el;
  } else {
    return cloneElement(el, el.props, replacedChildren);
  }
};

export {
  render,
  cleanup
};
