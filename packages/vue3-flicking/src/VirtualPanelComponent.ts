/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/naming-convention */
import { compile } from "vue/dist/vue.esm-bundler.js";
import { h } from "vue";
import { prop, Vue } from "vue-class-component";
import { VirtualPanel } from "@egjs/flicking";

class VirtualProps {
  innerHTML = prop<string | null>({ required: false, default: null });
}

class VirtualPanelComponent extends Vue.with(VirtualProps) {
  private shouldHide: boolean = false;
  private refPanel: VirtualPanel | null = null;

  public get element() { return this.$refs.el; }
  public get index() { return this.$.vnode.key as number; }
  public get renderingPanel() { return this.refPanel; }

  public set renderingPanel(val: VirtualPanel | null) { this.refPanel = val; }

  public render() {
    const renderingPanel = this.refPanel;
    const innerHTML = this.$props.innerHTML;

    if (renderingPanel && !renderingPanel.cachedInnerHTML && innerHTML) {
      renderingPanel.cacheRenderResult(innerHTML);
    }

    return this.shouldHide
      ? undefined
      : h("div", { ...this.$props, ref: "el" }, innerHTML ? compile(innerHTML) : undefined);
  }

  public show() {
    this.shouldHide = false;
  }

  public hide() {
    this.shouldHide = true;
  }
}

export default VirtualPanelComponent;
