import Vue from "vue";
import { Children, isValidElement } from "react";
import { mount } from "@vue/test-utils";
import VanillaFlicking from "@egjs/flicking";
import { Flicking } from "@egjs/vue-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { resolveFlickingWhenReady } from "../../common/utils";

const renderedComponents = [];

const render = async (el: JSX.Element): Promise<VanillaFlicking> => {
  const elAsVueComponent = Vue.component("vue-flicking-test-component", {
    components: {
      flicking: Flicking
    },
    render: (h) => {
      return parseJSX(h, el);
    }
  });

  const mounted = mount(elAsVueComponent, { attachTo: document.body });
  const flicking = mounted.findComponent<Flicking>(Flicking);

  renderedComponents.push(mounted);

  return resolveFlickingWhenReady(flicking.vm);
};

const parseJSX = (h: Vue.CreateElement, el: JSX.Element) => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];
  const parsedChildren = childs.map(child => parseJSX(h, child));

  if (el.type === DummyFlicking) {
    const { events, children, options, tag, cameraTag, style = {}, className = "", ...otherAttrs } = el.props;
    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`${eventName.replace(/([A-Z])/g, "-$1").toLowerCase()}`] = events[eventName];

      return eventsMap;
    }, {});

    const flicking = h("flicking", {
      style,
      staticClass: className,
      attrs: { ...otherAttrs },
      props: { viewportTag: tag, cameraTag, options },
      on: { ...eventHandlers }
    }, parsedChildren);

    return flicking;
  } else if (!isValidElement(el)) {
    return el;
  } else {
    const dom = el as JSX.Element;
    const { style = {}, className = "", ...otherAttrs } = dom.props;


    return h(dom.type, { style, staticClass: className, attrs: { ...otherAttrs } }, parsedChildren);
  }
};

const cleanup = () => {
  renderedComponents.forEach(comp => comp.destroy());
  renderedComponents.splice(0, renderedComponents.length);
};

export {
  render,
  cleanup
};
