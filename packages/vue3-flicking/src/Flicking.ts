/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/naming-convention */
import { Vue, Options, prop, VueConstructor } from "vue-class-component";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { h, VNode, resolveComponent, Fragment, getCurrentInstance } from "vue";
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

class FlickingProps {
  viewportTag = prop<string>({ required: false, default: "div" });
  cameraTag = prop<string>({ required: false, default: "div" });
  hideBeforeInit = prop<boolean>({ required: false, default: false });
  firstPanelSize = prop<string>({ required: false });
  options = prop<Partial<FlickingOptions>>({ required: false, default: {} });
  plugins = prop<Plugin[]>({ required: false, default: [] });
  status = prop<Status>({ required: false });
}

@Options({
  components: {
    Panel: VuePanelComponent,
    VirtualPanel: VirtualPanelComponent
  }
})
class Flicking extends Vue.with(FlickingProps) {
  @withFlickingMethods private vanillaFlicking: VanillaFlicking | null = null;
  private pluginsDiffer!: ListDiffer<Plugin>;
  private slotDiffer!: ListDiffer<VNode>;
  private diffResult?: DiffResult<VNode> = undefined;

  public mounted() {
    const viewportEl = this.$el as HTMLElement;
    const flicking = new VanillaFlicking(viewportEl, {
      ...this.options,
      ...{ renderExternal: {
        renderer: VueRenderer,
        rendererOptions: { vueFlicking: this }
      }}
    });
    this.vanillaFlicking = flicking;

    flicking.once(EVENTS.READY, () => {
      this.$forceUpdate();
    });

    const slots = this.getSlots();
    this.slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key! as string | number);
    this.pluginsDiffer = new ListDiffer<Plugin>();

    this._bindEvents();
    this._checkPlugins();
    if (this.status) {
      flicking.setStatus(this.status);
    }
  }

  public beforeDestroy() {
    this.vanillaFlicking?.destroy();
  }

  public beforeMount() {
    this._fillKeys();
  }

  public beforeUpdate() {
    this._fillKeys();
  }

  public updated() {
    const flicking = this.vanillaFlicking;
    const diffResult = this.diffResult;

    if (!diffResult) return;

    const children = (this.$.subTree as any).children[0].children.map((c: any) => c.component.ctx);

    sync(flicking!, diffResult, children);

    this._checkPlugins();

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.$forceUpdate();
    }
  }

  public render() {
    const flicking = this.vanillaFlicking;
    const options = this.options;
    const initialized = flicking && flicking.initialized;
    const isHorizontal = flicking
      ? flicking.horizontal
      : this.options.horizontal ?? true;

    const viewportData = {
      class: {
        "flicking-viewport": true,
        "vertical": !isHorizontal,
        "flicking-hidden": this.hideBeforeInit && !initialized
      }
    };
    const cameraData = {
      class: {
        "flicking-camera": true
      },
      style: !initialized && this.firstPanelSize
        ? { transform: getDefaultCameraTransform(this.options.align, this.options.horizontal, this.firstPanelSize) }
        : {}
    };

    const panels = options.virtual && options.panelsPerView && options.panelsPerView > 0
      ? this.getVirtualPanels
      : this.getPanels;

    const viewportSlots = this.$slots.viewport
      ? this.$slots.viewport()
      : [];

    return h(this.viewportTag, viewportData,
      [h(this.cameraTag, cameraData, { default: panels }), ...viewportSlots]
    );
  }

  public getSlots() {
    const slots = this.$slots.default
      ? this.$slots.default()
      : [];

    return slots.reduce((elementSlots, slot) => [...elementSlots, ...this.getElementVNodes(slot)], [] as VNode[]);
  }

  public getElementVNodes(slot: VNode, childSlots: VNode[] = []): VNode[] {
    if (slot.type === Fragment && Array.isArray(slot.children)) {
      slot.children
        .filter(child => child && typeof child === "object")
        .forEach(child => this.getElementVNodes(child as VNode, childSlots));
    } else {
      childSlots.push(slot);
    }

    return childSlots;
  }

  private _bindEvents() {
    const flicking = this.vanillaFlicking;
    const events = (Object.keys(EVENTS) as Array<keyof typeof EVENTS>)
      .map(key => EVENTS[key]);

    events.forEach(eventName => {
      flicking!.on(eventName, (e: any) => {
        e.currentTarget = this;
        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this.pluginsDiffer.update(this.plugins);

    this.vanillaFlicking!.addPlugins(...added.map(index => list[index]));
    this.vanillaFlicking!.removePlugins(...removed.map(index => prevList[index]));
  }

  private _fillKeys() {
    const vnodes = this.getSlots();

    vnodes.forEach((node, idx) => {
      if (node.key == null) {
        node.key = `$_${idx}`;
      }
    });
  }

  private getPanels = () => {
    const componentInstance = getCurrentInstance() as any;
    const vueFlicking = componentInstance?.ctx;
    const flicking = this.vanillaFlicking;
    const initialized = flicking && flicking.initialized;
    const defaultSlots = this.getSlots();

    this.diffResult = initialized
      ? vueFlicking.slotDiffer.update(defaultSlots)
      : undefined;

    const slots = this.diffResult
      ? getRenderingPanels(flicking!, this.diffResult)
      : defaultSlots;
    const panelComponent = resolveComponent("Panel");
    const panels = slots.map((slot, idx) => h(panelComponent as any, {
      key: slot.key!,
      ref: idx.toString()
    }, () => slot));

    return panels;
  };

  private getVirtualPanels = () => {
    const {
      panelClass = "flicking-panel",
      renderPanel
    } = this.options.virtual!;
    const panelsPerView = this.options.panelsPerView!;
    const flicking = this.vanillaFlicking!;
    const initialized = flicking && flicking.initialized;
    const panelComponent = resolveComponent("VirtualPanel");

    if (initialized) {
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

        return h(panelComponent as any, {
          key: virtualEl.index,
          ref: virtualEl.index.toString(),
          class: panelClass,
          style: size,
          innerHTML
        });
      });
    } else {
      return range(panelsPerView + 1).map(idx => {
        return h(panelComponent as any, { key: idx, ref: idx.toString(), class: panelClass });
      });
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Flicking extends VanillaFlicking, VueConstructor<Vue & FlickingProps> {}
export default Flicking;
