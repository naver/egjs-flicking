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
  const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];
  const replacedChildren = children.map(child => replaceFlickingJSX(child, flickingRef));

  if (el.type === DummyFlicking) {
    const events = (el as unknown as DummyFlicking).props.events;
    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = events[eventName];

      return eventsMap;
    }, {});

    return <Flicking ref={flickingRef} key="flicking" viewportTag={el.props.tag} cameraTag={el.props.cameraTag} {...el.props.options} {...eventHandlers}>{ replacedChildren }</Flicking>;
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
