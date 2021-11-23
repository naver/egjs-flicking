/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import { defineComponent } from "vue";

const VuePanel = defineComponent({
  data() {
    return {
      hide: false
    };
  },
  render() {
    if (this.hide || !this.$slots.default) return;

    return this.$slots.default();
  }
});

type VuePanelType = InstanceType<typeof VuePanel>;

interface VuePanel extends VuePanelType {}
export default VuePanel;
