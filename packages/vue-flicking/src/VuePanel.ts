/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { Component, Vue } from "vue-property-decorator";

@Component({})
class VuePanel extends Vue {
  public hide = false;

  public get nativeElement() { return this.$el as HTMLElement; }

  public render() {
    return this.hide
      ? undefined
      : this.$slots.default ?? [];
  }
}

export default VuePanel;
