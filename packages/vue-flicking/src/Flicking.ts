/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";
import VanillaFlicking, {
  EVENTS,
  FlickingOptions,
  withFlickingMethods,
  sync,
  Plugin,
  Status,
  getRenderingPanels,
  getDefaultCameraTransform,
  range
} from "@egjs/flicking";

import VueRenderer from "./VueRenderer";
import VuePanelComponent from "./VuePanelComponent";
import VirtualPanelComponent from "./VirtualPanelComponent";

@Component({
  components: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Panel: VuePanelComponent,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    VirtualPanel: VirtualPanelComponent
  }
})
class Flicking extends Vue {
  // Tag of the viewport element
  @Prop({ type: String, default: "div", required: false }) public viewportTag!: string;
  // Tag of the camera element
  @Prop({ type: String, default: "div", required: false }) public cameraTag!: string;
  @Prop({ type: Boolean, default: false, required: false }) public hideBeforeInit!: string;
  @Prop({ type: String, required: false }) public firstPanelSize?: string;
  @Prop({ type: Object, default: () => ({}), required: false }) public options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) public plugins!: Plugin[];
  @Prop({ type: Object, required: false }) public status!: Status;

  @withFlickingMethods private _vanillaFlicking!: VanillaFlicking;
  private _pluginsDiffer!: ListDiffer<Plugin>;
  private _slotDiffer!: ListDiffer<VNode>;
  private _diffResult: DiffResult<VNode> | null = null;

  public mounted() {
    const viewportEl = this.$el as HTMLElement;
    const flicking = new VanillaFlicking(viewportEl, {
      ...this.options,
      ...{ renderExternal: {
        renderer: VueRenderer,
        rendererOptions: { vueFlicking: this }
      }}
    });
    this._vanillaFlicking = flicking;

    flicking.once(EVENTS.READY, () => {
      this.$forceUpdate();
    });

    const slots = this._getSlots();
    this._slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key!);
    this._pluginsDiffer = new ListDiffer<Plugin>();

    this._bindEvents();
    this._checkPlugins();
    if (this.status) {
      flicking.setStatus(this.status);
    }
  }

  public beforeDestroy() {
    this._vanillaFlicking.destroy();
  }

  public beforeMount() {
    this._fillKeys();
  }

  public beforeUpdate() {
    this._fillKeys();

    this._diffResult = this._slotDiffer.update(this._getSlots());
  }

  public updated() {
    const flicking = this._vanillaFlicking;
    const diffResult = this._diffResult;

    if (!diffResult) return;

    sync(flicking, diffResult, this.$children);

    this._checkPlugins();

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.$forceUpdate();
    }

    this._diffResult = null;
  }

  public render(h: CreateElement) {
    const flicking = this._vanillaFlicking;
    const options = this.options;
    const initialized = !!this._diffResult && flicking && flicking.initialized;
    const isHorizontal = flicking
      ? flicking.horizontal
      : this.options.horizontal ?? true;

    const viewportData: VNodeData = {
      class: {
        "flicking-viewport": true,
        "vertical": !isHorizontal,
        "flicking-hidden": this.hideBeforeInit && !initialized
      }
    };
    const cameraData: VNodeData = {
      class: {
        "flicking-camera": true
      },
      style: !initialized && this.firstPanelSize
        ? { transform: getDefaultCameraTransform(this.options.align, this.options.horizontal, this.firstPanelSize) }
        : {}
    };

    const panels = options.virtual && options.panelsPerView && options.panelsPerView > 0
      ? this._getVirtualPanels(h, initialized)
      : this._getPanels(h, initialized);

    this.$emit("render");

    return h(this.viewportTag, viewportData,
      [h(this.cameraTag, cameraData,
        panels,
      ), this.$slots.viewport],
    );
  }

  private _bindEvents() {
    const flicking = this._vanillaFlicking;
    const events = Object.keys(EVENTS).map(key => EVENTS[key]);

    events.forEach(eventName => {
      flicking.on(eventName, (e: any) => {
        e.currentTarget = this;
        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins);

    this._vanillaFlicking.addPlugins(...added.map(index => list[index]));
    this._vanillaFlicking.removePlugins(...removed.map(index => prevList[index]));
  }

  private _getSlots() {
    return this.$slots.default?.filter(slot => slot.tag) ?? [];
  }

  private _fillKeys() {
    const vnodes = this._getSlots();

    vnodes.forEach((node, idx) => {
      if (node.key == null) {
        node.key = `$_${idx}`;
      }
    });
  }

  private _getPanels(h: CreateElement, initialized: boolean) {
    const slots = initialized
      ? getRenderingPanels(this._vanillaFlicking, this._diffResult!)
      : this._getSlots();
    return slots.map(slot => h("Panel", { key: slot.key }, [slot]));
  }

  private _getVirtualPanels(h: CreateElement, initialized: boolean) {
    const {
      panelClass = "flicking-panel",
      renderPanel
    } = this.options.virtual!;
    const panelsPerView = this.options.panelsPerView!;

    if (initialized) {
      const flicking = this._vanillaFlicking;
      const virtualElements = flicking.virtual.getVirtualElementsByOrder();
      const firstPanel = flicking.panels[0];
      const size = firstPanel
        ? flicking.horizontal
          ? { width: `${firstPanel.size}px` }
          : { height: `${firstPanel.size}px` }
        : {};

      return virtualElements.map(virtualEl => {
        const renderingPanel = virtualEl.renderingPanel;

        const innerHTML = renderingPanel
          ? renderingPanel.cachedInnerHTML
            ? renderingPanel.cachedInnerHTML
            : renderPanel(renderingPanel, renderingPanel.index)
          : null;

        return h("VirtualPanel", {
          key: virtualEl.index,
          staticClass: panelClass,
          style: size,
          props: { innerHTML }
        });
      });
    } else {
      return range(panelsPerView + 1).map(idx => {
        return h("VirtualPanel", { key: idx, staticClass: panelClass });
      });
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Flicking extends VanillaFlicking {}
export default Flicking;
