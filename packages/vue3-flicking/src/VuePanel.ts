/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Vue } from "vue-class-component";

class VuePanel extends Vue {
  public hide: boolean = false;

  public get nativeElement() { return this.$.subTree.children![0].el as HTMLElement; }

  public render() {
    if (this.hide || !this.$slots.default) return;

    return this.$slots.default() as any;
  }
}

export default VuePanel;
