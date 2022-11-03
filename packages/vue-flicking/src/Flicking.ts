/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import Vue, { CreateElement, VNodeData, VNode } from "vue";
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

import VueRenderer, { VueRendererOptions } from "./VueRenderer";
import VuePanel from "./VuePanel";
import VueElementProvider from "./VueElementProvider";
import FlickingProps from "./FlickingProps";
import { fillKeys, getSlots } from "./utils";

const Flicking = Vue.extend({
  props: FlickingProps,
  components: {
    Panel: VuePanel
  },
  data() {
    // Mocking the type, as we don't want them to be reactive
    return {} as {
      vanillaFlicking: VanillaFlicking;
      pluginsDiffer: ListDiffer<Plugin>;
      slotDiffer: ListDiffer<VNode>;
      diffResult: DiffResult<VNode> | null;
    };
  },
  created() {
    this.diffResult = null;

    withFlickingMethods(this, "vanillaFlicking");
  },
  mounted() {
    const options = this.options;
    const viewportEl = this.$el as HTMLElement;
    const rendererOptions: VueRendererOptions = {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      vueFlicking: this as any,
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

    const slots = getSlots(this);
    this.slotDiffer = new ListDiffer<VNode>(slots, vnode => (vnode.key as string));
    this.pluginsDiffer = new ListDiffer<Plugin>();

    this._bindEvents();
    this._checkPlugins();

    if (this.status) {
      flicking.setStatus(this.status);
    }
  },
  beforeDestroy() {
    this.vanillaFlicking?.destroy();
  },
  beforeMount() {
    fillKeys(this);
  },
  beforeUpdate() {
    fillKeys(this);

    this.diffResult = this.slotDiffer.update(getSlots(this));
  },
  updated() {
    const flicking = this.vanillaFlicking;
    const diffResult = this.diffResult;

    this._checkPlugins();
    this.$emit("render");

    if (!diffResult || !flicking.initialized) return;

    sync(flicking, diffResult, this.$children);

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.$forceUpdate();
    }

    this.diffResult = null;
  },
  render(h: CreateElement): VNode {
    const flicking = this.vanillaFlicking;
    const options = this.options;
    const initialized = !!this.diffResult && flicking && flicking.initialized;
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
        "flicking-camera": true,
        [this.cameraClass]: !!this.cameraClass
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
  },
  methods: {
    /* eslint-disable @typescript-eslint/naming-convention */
    _getSlots() {
      return this.$slots.default?.filter(slot => slot.tag) ?? [];
    },
    _fillKeys() {
      const vnodes = this._getSlots();

      vnodes.forEach((node, idx) => {
        if (node.key == null) {
          node.key = `$_${idx}`;
        }
      });
    },
    _bindEvents() {
      const flicking = this.vanillaFlicking;
      const events = Object.keys(EVENTS).map(key => EVENTS[key]);

      events.forEach(eventName => {
        flicking.on(eventName, (e: any) => {
          e.currentTarget = this;
          // Make events from camelCase to kebab-case
          this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
        });
      });
    },
    _checkPlugins() {
      const { list, added, removed, prevList } = this.pluginsDiffer.update(this.plugins);

      this.vanillaFlicking.addPlugins(...added.map(index => list[index]));
      this.vanillaFlicking.removePlugins(...removed.map(index => prevList[index]));
    },
    _getPanels(h: CreateElement, initialized: boolean) {
      const slots = initialized
        ? getRenderingPanels(this.vanillaFlicking, this.diffResult!)
        : this._getSlots();
      return slots.map(slot => h("Panel", { key: slot.key as string }, [slot]));
    },
    _getVirtualPanels(h: CreateElement, initialized: boolean) {
      const options = this.options;
      const {
        panelClass = "flicking-panel"
      } = options.virtual!;
      const panelsPerView = options.panelsPerView as number;
      const flicking = this.vanillaFlicking;

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
});

type VueFlicking = InstanceType<typeof Flicking>;

interface Flicking extends VueFlicking, VanillaFlicking {}
export default Flicking;
