import { defineComponent, h, resolveComponent } from "vue";
import { Children, isValidElement } from "react";
import { mount } from "@vue/test-utils";
import VanillaFlicking from "@egjs/flicking";
import Flicking from "@egjs/vue3-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { resolveFlickingWhenReady } from "../../common/utils";

const renderedComponents = [];


const render = async (el: JSX.Element): Promise<VanillaFlicking> => {
  const elAsVueComponent = defineComponent({
    name: "vue-flicking-test-component",
    components: {
      Flicking
    },
    render() {
      return parseJSX(el);
    }
  });

  const mounted = mount(elAsVueComponent, {
    attachTo: document.body,
    global: {
      config: {
        warnHandler: () => void 0
      }
    }
  });
  const flicking = mounted.findComponent({ ref: "flicking" });

  renderedComponents.push(mounted);

  return resolveFlickingWhenReady(flicking.vm as unknown as VanillaFlicking);
};

const parseJSX = (el: JSX.Element) => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];
  const parsedChildren = childs.map(child => parseJSX(child));

  if (el.type === DummyFlicking) {
    const { events, children, options, plugins, tag, cameraTag, style = {}, className = "", ...otherAttrs } = el.props;
    const eventHandlers = Object.keys(events).reduce((eventsMap, eventName) => {
      eventsMap[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] = events[eventName];

      return eventsMap;
    }, {});

    const Vue3Flicking = resolveComponent("Flicking") as any;

    const flicking = h(Vue3Flicking, {
      style,
      options,
      plugins,
      ...otherAttrs,
      ...eventHandlers,
      ref: "flicking"
    }, parsedChildren);

    return flicking;
  } else if (!isValidElement(el)) {
    return el;
  } else {
    const dom = el as JSX.Element;
    const { style = {}, className = "", children, ...otherAttrs } = dom.props;

    return h(dom.type as any, { style, ...otherAttrs, class: className }, parsedChildren);
  }
};

const cleanup = () => {
  renderedComponents.forEach(comp => comp.unmount());
  renderedComponents.splice(0, renderedComponents.length);
};

export {
  render,
  cleanup
};
