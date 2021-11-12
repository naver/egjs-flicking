/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Vue } from "vue-class-component";

class VuePanel extends Vue {
  public hide: boolean = false;

  public render() {
    if (this.hide || !this.$slots.default) return;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return this.$slots.default() as any;
  }
}

export default VuePanel;
