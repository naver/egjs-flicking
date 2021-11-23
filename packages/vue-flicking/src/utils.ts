import Vue from "vue";

export const getSlots = (component: Vue) => {
  return component.$slots.default?.filter(slot => slot.tag) ?? [];
};

export const fillKeys = (component: Vue) => {
  const vnodes = getSlots(component);

  vnodes.forEach((node, idx) => {
    if (node.key == null) {
      node.key = `$_${idx}`;
    }
  });
};
