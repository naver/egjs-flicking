/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/naming-convention */
import { Vue, Options, prop, VueConstructor } from "vue-class-component";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { h, VNode, resolveComponent, Fragment } from "vue";
import VanillaFlicking, {
  EVENTS,
  FlickingOptions,
  withFlickingMethods,
  sync,
  Plugin,
  Status,
  getRenderingPanels
} from "@egjs/flicking";

import VueRenderer from "./VueRenderer";
import VuePanelComponent from "./VuePanelComponent";

class FlickingProps {
  viewportTag = prop<string>({ required: false, default: "div" });
  cameraTag = prop<string>({ required: false, default: "div" });
  options = prop<Partial<FlickingOptions>>({ required: false, default: {} });
  plugins = prop<Plugin[]>({ required: false, default: [] });
  status = prop<Status>({ required: false });
}

@Options({
  components: {
    Panel: VuePanelComponent
  }
})
class Flicking extends Vue.with(FlickingProps) {
  @withFlickingMethods private vanillaFlicking: VanillaFlicking | null = null;
  private pluginsDiffer!: ListDiffer<Plugin>;
  private slotDiffer!: ListDiffer<VNode>;
  private diffResult: DiffResult<VNode> | null = null;

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
    this.slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key!);
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
    const isHorizontal = flicking
      ? flicking.horizontal
      : this.options.horizontal ?? true;

    const viewportData = {
      class: {
        "flicking-viewport": true,
        "vertical": !isHorizontal
      }
    };
    const cameraData = {
      class: {
        "flicking-camera": true
      }
    };

    const getPanels = () => {
      const defaultSlots = this.getSlots();
      this.diffResult = flicking && flicking.initialized
        ? this.slotDiffer.update(defaultSlots)
        : null;

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

    const viewportSlots = this.$slots.viewport
      ? this.$slots.viewport()
      : [];

    return h(this.viewportTag, viewportData,
      [h(this.cameraTag, cameraData, { default: getPanels }), ...viewportSlots]
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
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Flicking extends VanillaFlicking, VueConstructor<Vue & FlickingProps> {}
export default Flicking;

