/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Vue from "vue";

const VuePanel = Vue.extend<{ hide: boolean }, { getElement: () => HTMLElement }, {}>({
  data() {
    return {
      hide: false
    };
  },
  render() {
    const children = this.hide
      ? undefined
      : this.$slots.default ?? [];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return children as any;
  },
  methods: {
    getElement(): HTMLElement { return this.$el as HTMLElement; }
  }
});

type VuePanelType = InstanceType<typeof VuePanel>;

interface VuePanel extends VuePanelType {}
export default VuePanel;
