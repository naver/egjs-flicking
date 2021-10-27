/*
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
  range,
  VirtualRenderingStrategy,
  NormalRenderingStrategy,
  ExternalPanel
} from "@egjs/flicking";

import VueRenderer, { VueRendererOptions } from "./VueRenderer";
import VuePanel from "./VuePanel";
import VueElementProvider from "./VueElementProvider";

@Component({
  components: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Panel: VuePanel
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
    const options = this.options;
    const viewportEl = this.$el as HTMLElement;
    const rendererOptions: VueRendererOptions = {
      vueFlicking: this,
      strategy: options.virtual && (options.panelsPerView ?? -1) > 0
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: VueElementProvider,
          panelCtor: ExternalPanel
        })
    };

    const flicking = new VanillaFlicking(viewportEl, {
      ...this.options,
      ...{ renderExternal: {
        renderer: VueRenderer,
        rendererOptions
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
    this._vanillaFlicking?.destroy();
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

    this._checkPlugins();
    this.$emit("render");

    if (!diffResult || !flicking.initialized) return;

    sync(flicking, diffResult, this.$children);

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
      : options.horizontal ?? true;

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
        ? { transform: getDefaultCameraTransform(options.align, options.horizontal, this.firstPanelSize) }
        : {}
    };

    const panels = options.virtual && (options.panelsPerView ?? -1) > 0
      ? this._getVirtualPanels(h, initialized)
      : this._getPanels(h, initialized);

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
    const options = this.options;
    const {
      panelClass = "flicking-panel"
    } = options.virtual!;
    const panelsPerView = options.panelsPerView!;
    const flicking = this._vanillaFlicking;

    const renderingIndexes = initialized
      ? flicking.renderer.strategy.getRenderingIndexesByOrder(flicking)
      : range(panelsPerView + 1);

    const firstPanel = flicking && flicking.panels[0];
    const size = firstPanel
      ? flicking.horizontal
        ? { width: firstPanel.size }
        : { height: firstPanel.size }
      : {};

    return renderingIndexes.map(idx => h("div", {
      key: idx,
      staticClass: panelClass,
      style: size,
      domProps: {
        "data-element-index": idx
      }
    }));
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Flicking extends VanillaFlicking {}
export default Flicking;
