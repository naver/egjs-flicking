/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { h, defineComponent, VNode, resolveComponent, Fragment, getCurrentInstance, Comment, Text } from "vue";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import Component from "@egjs/component";
import VanillaFlicking, {
  EVENTS,
  withFlickingMethods,
  sync,
  Plugin,
  getRenderingPanels,
  getDefaultCameraTransform,
  range,
  VirtualRenderingStrategy,
  NormalRenderingStrategy
} from "@egjs/flicking";

import FlickingProps from "./FlickingProps";
import VueRenderer, { VueRendererOptions } from "./VueRenderer";
import VuePanel from "./VuePanel";
import VueElementProvider from "./VueElementProvider";
import { VueFlicking } from "./types";

const Flicking = defineComponent({
  props: FlickingProps,
  components: {
    Panel: VuePanel
  },
  data() {
    return {} as {
      renderEmitter: Component<{ render: void }>;
      vanillaFlicking: VanillaFlicking;
      pluginsDiffer: ListDiffer<Plugin>;
      slotDiffer: ListDiffer<VNode>;
      diffResult: DiffResult<VNode> | null;
    };
  },
  created() {
    this.vanillaFlicking = null;
    this.renderEmitter = new Component();
    this.diffResult = null;

    this.getPanels = () => {
      const componentInstance = getCurrentInstance() as unknown as { ctx: Flicking } | null;
      const vueFlicking = componentInstance?.ctx;
      const flicking = this.vanillaFlicking;
      const defaultSlots = this.getSlots();
      const diffResult = vueFlicking?.diffResult;

      const slots = diffResult
        ? getRenderingPanels(flicking, diffResult)
        : defaultSlots;

      const panelComponent = resolveComponent("Panel");
      const panels = slots.map((slot, idx) => h(panelComponent as any, {
        key: slot.key!,
        ref: idx.toString()
      }, () => slot));

      return panels;
    };
    this.getVirtualPanels = () => {
      const options = this.options;
      const {
        panelClass = "flicking-panel"
      } = options.virtual!;
      const panelsPerView = options.panelsPerView as number;
      const flicking = this.vanillaFlicking;
      const initialized = flicking && flicking.initialized;

      const renderingIndexes = initialized
        ? flicking.renderer.strategy.getRenderingIndexesByOrder(flicking)
        : range(panelsPerView + 1);

      const firstPanel = initialized && flicking.panels[0];
      const size = firstPanel
        ? flicking.horizontal
          ? { width: firstPanel.size }
          : { height: firstPanel.size }
        : {};

      return renderingIndexes.map(idx => h("div", {
        key: idx,
        ref: idx.toString(),
        class: panelClass,
        style: size,
        "data-element-index": idx
      }));
    };

    withFlickingMethods(this, "vanillaFlicking");
  },
  mounted() {
    const options = this.options;
    const viewportEl = this.$el as HTMLElement;
    const rendererOptions: VueRendererOptions = {
      vueFlicking: this,
      align: options.align,
      strategy: options.virtual && (options.panelsPerView ?? -1) > 0
        ? new VirtualRenderingStrategy()
        : new NormalRenderingStrategy({
          providerCtor: VueElementProvider
        })
    };

    const flicking = new VanillaFlicking(viewportEl, {
      ...options,
      externalRenderer: new VueRenderer(rendererOptions)
    });
    this.vanillaFlicking = flicking;

    flicking.once(EVENTS.READY, () => {
      this.$forceUpdate();
    });

    const slots = this.getSlots();
    this.slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key! as string | number);
    this.pluginsDiffer = new ListDiffer<Plugin>();

    this.bindEvents();
    this.checkPlugins();

    if (this.status) {
      flicking.setStatus(this.status);
    }
  },
  beforeUnmount() {
    this.vanillaFlicking?.destroy();
  },
  beforeMount() {
    this.fillKeys();
  },
  beforeUpdate() {
    this.fillKeys();

    this.diffResult = this.slotDiffer.update(this.getSlots());
  },
  updated() {
    const flicking = this.vanillaFlicking;
    const diffResult = this.diffResult;

    this.checkPlugins();
    this.renderEmitter.trigger("render");

    if (!diffResult || !flicking?.initialized) return;

    const children = this.getChildren();

    sync(flicking, diffResult, children);

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.$forceUpdate();
    }

    this.diffResult = undefined;
  },
  render() {
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
        "flicking-camera": true,
        [this.cameraClass]: !!this.cameraClass
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
  },
  methods: {
    getSlots() {
      const slots = this.$slots.default
        ? this.$slots.default()
        : [];

      return slots
        .reduce((elementSlots, slot) => [...elementSlots, ...this.getElementVNodes(slot)], [] as VNode[])
        .filter(slot => slot.type !== Comment && slot.type !== Text);
    },
    getElementVNodes(slot: VNode, childSlots: VNode[] = []): VNode[] {
      if (slot.type === Fragment && Array.isArray(slot.children)) {
        slot.children
          .filter(child => child && typeof child === "object")
          .forEach(child => this.getElementVNodes(child as VNode, childSlots));
      } else {
        childSlots.push(slot);
      }

      return childSlots;
    },
    bindEvents() {
      const flicking = this.vanillaFlicking;
      const events = (Object.keys(EVENTS) as Array<keyof typeof EVENTS>)
        .map(key => EVENTS[key]);

      events.forEach(eventName => {
        flicking.on(eventName, (e: any) => {
          e.currentTarget = this;
          // Make events from camelCase to kebab-case
          this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
        });
      });
    },
    checkPlugins() {
      const { list, added, removed, prevList } = this.pluginsDiffer.update(this.plugins);

      this.vanillaFlicking!.addPlugins(...added.map(index => list[index]));
      this.vanillaFlicking!.removePlugins(...removed.map(index => prevList[index]));
    },
    fillKeys() {
      const vnodes = this.getSlots();

      vnodes.forEach((node, idx) => {
        if (node.key == null) {
          node.key = `$_${idx}`;
        }
      });
    },
    getChildren() {
      const childRefs = this.$refs;

      return Object.keys(childRefs).map(refKey => childRefs[refKey]);
    }
  },
  watch: {
    options: {
      handler(newOptions) {
        const flicking = this.vanillaFlicking;
        if (!flicking) return;

        // Omit 'virtual', as it can't have any setter
        const { virtual, ...options } = newOptions; // eslint-disable-line @typescript-eslint/no-unused-vars

        for (const key in options) {
          if (key in flicking && flicking[key] !== options[key]) {
            flicking[key] = options[key];
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
}) as unknown as VueFlicking;

interface Flicking extends VueFlicking, VanillaFlicking {}
export default Flicking;
