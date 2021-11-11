import { toChildArray, cloneElement, createRef, isValidElement, RefObject } from "preact";
import { render as renderPreactComponent, cleanup } from "@testing-library/preact";
import Flicking from "@egjs/preact-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { resolveFlickingWhenReady } from "../../common/utils";

const render = async (el: JSX.Element) => {
  const flickingRef = createRef<Flicking>();
  const replaced = replaceFlickingJSX(el, flickingRef);

  renderPreactComponent(replaced);

  return resolveFlickingWhenReady(flickingRef.current);
};

const replaceFlickingJSX = (el: JSX.Element, flickingRef: RefObject<Flicking>): JSX.Element => {
  const childs = toChildArray(el.props?.children ?? []) as JSX.Element[];
  const replacedChildren = childs.map(child => replaceFlickingJSX(child, flickingRef));

  if (el.type === DummyFlicking) {
    const { events, children, options, tag, cameraTag, ...otherProps } = el.props;

    const PreactFlicking = Flicking as any;
    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = events[eventName];

      return eventsMap;
    }, {});

    return <PreactFlicking
      key="flicking"
      ref={flickingRef}
      viewportTag={tag}
      cameraTag={cameraTag}
      {...options}
      {...eventHandlers}
      {...otherProps}
    >{ replacedChildren }</PreactFlicking>;
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
