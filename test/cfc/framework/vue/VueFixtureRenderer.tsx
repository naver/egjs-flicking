import Vue from "vue";
import { Children } from "react";
import { mount } from "@vue/test-utils";
import VanillaFlicking from "@egjs/flicking";
import { Flicking } from "@egjs/vue-flicking";

import DummyFlicking from "../../fixture/DummyFlicking";
import { createSandbox } from "../../common/utils";

const render = async (el: JSX.Element): Promise<VanillaFlicking> => {
  const sandbox = createSandbox("vue-ui");
  const elAsVueComponent = Vue.component("vue-flicking-test-component", {
    components: {
      flicking: Flicking
    },
    render: (h) => {
      return parseJSX(h, el);
    }
  });
  const wrapper = mount(elAsVueComponent);
  const flickingInst = wrapper.findComponent<Flicking>(Flicking);

  sandbox.appendChild(wrapper.element);

  return flickingInst.vm as unknown as VanillaFlicking;
};

const parseJSX = (h: Vue.CreateElement, el: JSX.Element) => {
  const children = Children.toArray(el.props?.children ?? []) as JSX.Element[];
  const parsedChildren = children.map(child => parseJSX(h, child));

  if (el.type === DummyFlicking) {
    return h("flicking", { props: { viewportTag: el.props.tag, cameraTag: el.props.cameraTag, options: el.props.options }, ref: "flicking" }, parsedChildren);
  } else {
    const className = el.props?.className ?? "";

    return h(el.type, { attrs: { ...el.props, class: className } }, parsedChildren);
  }
};

export {
  render
};
