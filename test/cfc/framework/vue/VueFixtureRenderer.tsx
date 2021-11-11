import Vue from "vue";
import { Children } from "react";
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
  const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];
  const parsedChildren = children.map(child => parseJSX(h, child));

  if (el.type === DummyFlicking) {
    const events = el.props.events;
    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`${eventName.replace(/([A-Z])/g, "-$1").toLowerCase()}`] = events[eventName];

      return eventsMap;
    }, {});

    return h("flicking", {
      props: { viewportTag: el.props.tag, cameraTag: el.props.cameraTag, options: el.props.options },
      // "on" not works for some reason
      on: { ...eventHandlers }
    }, parsedChildren);
  } else {
    const className = el.props?.className ?? "";

    return h(el.type, { attrs: { ...el.props, class: className } }, parsedChildren);
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
