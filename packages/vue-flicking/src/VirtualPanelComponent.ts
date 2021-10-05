import { CreateElement } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import { VirtualPanel } from "@egjs/flicking";

@Component({})
class VirtualPanelComponent extends Vue {
  @Prop({ type: String, default: null, required: false }) public innerHTML!: string | null;

  public renderingPanel: VirtualPanel | null = null;

  private _hide: boolean = false;

  public get element() { return this.$el as HTMLElement; }
  public get index() { return this.$vnode.key as number; }

  public render(h: CreateElement) {
    const renderingPanel = this.renderingPanel;
    const innerHTML = this.innerHTML;

    if (renderingPanel && !renderingPanel.cachedInnerHTML && innerHTML) {
      renderingPanel.cacheRenderResult(innerHTML);
    }

    return this._hide
      ? undefined
      : h("div", { ...this.$props, domProps: { innerHTML: this.innerHTML ?? "" } });
  }

  public show() {
    this._hide = false;
  }

  public hide() {
    this._hide = true;
  }
}

export default VirtualPanelComponent;
