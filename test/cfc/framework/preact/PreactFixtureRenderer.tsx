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
  const children = toChildArray(el.props?.children ?? []) as JSX.Element[];
  const replacedChildren = children.map(child => replaceFlickingJSX(child, flickingRef));

  if (el.type === DummyFlicking) {
    const PreactFlicking = Flicking as any;
    const events = (el as unknown as DummyFlicking).props.events;
    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = events[eventName];

      return eventsMap;
    }, {});

    return <PreactFlicking ref={flickingRef} key="flicking" viewportTag={el.props.tag} cameraTag={el.props.cameraTag} {...el.props.options} {...eventHandlers}>{ replacedChildren }</PreactFlicking>;
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
