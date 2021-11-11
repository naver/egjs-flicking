import { defineComponent } from "vue";
import { Children, isValidElement } from "react";
import { mount } from "@vue/test-utils";
import VanillaFlicking from "@egjs/flicking";
import Flicking from "@egjs/vue3-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { resolveFlickingWhenReady } from "../../common/utils";

const renderedComponents = [];

const render = async (el: JSX.Element): Promise<VanillaFlicking> => {
  const flickingJSX = findFlickingJSX(el);

  const elAsVueComponent = defineComponent({
    name: "vue-flicking-test-component",
    components: {
      Flicking
    },
    data() {
      return {
        options: flickingJSX.props.options,
        events: flickingJSX.props.events
      };
    },
    template: parseJSX(el)
  });

  const mounted = mount(elAsVueComponent, { attachTo: document.body });
  const flicking = mounted.findComponent({ ref: "flicking" });

  renderedComponents.push(mounted);

  return resolveFlickingWhenReady(flicking.vm as unknown as VanillaFlicking);
};

const findFlickingJSX = (el: JSX.Element): DummyFlicking | null => {
  const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    return el as unknown as DummyFlicking;
  }

  for (const child of children) {
    const found = findFlickingJSX(child);
    if (found) {
      return found;
    }
  }

  return null;
};

const parseJSX = (el: JSX.Element) => {
  const childs = Children.toArray(el.props?.children ?? []) as JSX.Element[];

  if (el.type === DummyFlicking) {
    const replacedChildren = childs.map(child => parseJSX(child)).join("");
    const events = el.props.events;
    const eventHandlers = Object.keys(events).map(eventName => {
      return `@${eventName.replace(/([A-Z])/g, "-$1").toLowerCase()}="events.${eventName}"`;
    });

    return `<Flicking ref="flicking" :options="options" ${ eventHandlers.join(" ") }>${ replacedChildren }</Flicking>`;
  } else if (!isValidElement(el)) {
    return el;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, children, ...otherProps } = el.props;
    const attrs = [];
    const replacedChildren = childs.map(child => parseJSX(child)).join("");

    if (className) {
      attrs.push(`class="${className}"`);
    }

    for (const key in otherProps) {
      attrs.push(`${key}="${otherProps[key]}"`);
    }

    const type = el.type as string;

    return `<${type} ${attrs.join(" ")}>${ replacedChildren }</${type}>`;
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
