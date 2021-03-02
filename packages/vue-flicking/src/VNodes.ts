import Vue, { VNode } from "vue";

const VNodes = Vue.extend<{
  vnodes: VNode[];
}>({
  functional: true,
  render: (h, ctx) => ctx.props.vnodes
});

export default VNodes;
