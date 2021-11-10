import { defineComponent, h, resolveComponent } from "vue";
import { Children, isValidElement } from "react";
import { mount } from "@vue/test-utils";
import VanillaFlicking from "@egjs/flicking";
import Flicking from "@egjs/vue3-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";

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
        options: flickingJSX.props.options as any
      };
    },
    template: parseJSX(el)
  });
  const mounted = mount(elAsVueComponent, { attachTo: document.body });
  const flickingInst = mounted.findComponent({ ref: "flicking" });

  renderedComponents.push(mounted);

  return flickingInst.vm as unknown as VanillaFlicking;
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
    return `<Flicking ref="flicking" :options="options">${ replacedChildren }</Flicking>`;
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
