import { Vue } from "vue-class-component";

class VuePanelComponent extends Vue {
  public hide: boolean = false;

  public render() {
    if (this.hide || !this.$slots.default) return;

    return this.$slots.default() as any;
  }
}

export default VuePanelComponent;
