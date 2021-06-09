import { Component, Vue } from "vue-property-decorator";

@Component({})
class VuePanelComponent extends Vue {
  public hide: boolean = false;

  public render() {
    return this.hide
      ? undefined
      : this.$slots.default ?? [];
  }
}

export default VuePanelComponent;
