import { Children, cloneElement, createRef, isValidElement, RefObject } from "react";
import { render as renderReactComponent, cleanup } from "@testing-library/react";
import Flicking from "@egjs/react-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { resolveFlickingWhenReady } from "../../common/utils";

const render = async (el: JSX.Element) => {
  const flickingRef = createRef<Flicking>();
  const replaced = replaceFlickingJSX(el, flickingRef);

  renderReactComponent(replaced);

  return resolveFlickingWhenReady(flickingRef.current);
};

const replaceFlickingJSX = (el: JSX.Element, flickingRef: RefObject<Flicking>): JSX.Element => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];
  const replacedChildren = childs.map(child => replaceFlickingJSX(child, flickingRef));

  if (el.type === DummyFlicking) {
    const { events, children, options, tag, cameraTag, plugins, ...otherProps } = el.props;

    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = events[eventName];

      return eventsMap;
    }, {});

    return <Flicking
      key="flicking"
      ref={flickingRef}
      viewportTag={tag}
      cameraTag={cameraTag}
      plugins={plugins}
      {...options}
      {...eventHandlers}
      {...otherProps}
    >{ replacedChildren }</Flicking>;
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
