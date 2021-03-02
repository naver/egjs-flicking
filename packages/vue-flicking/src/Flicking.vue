<template>
  <component :is="this.viewportTag" class="flicking-viewport">
    <component :is="this.cameraTag" class="flicking-camera">
      <VNodes :vnodes="panels" />
    </component>
  </component>
</template>
<script lang="ts">
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import ChildrenDiffer from "@egjs/vue-children-differ";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";
import * as uuid from "uuid";

import Flicking, { EVENTS, FlickingOptions } from "../../../src/index";
import VNodes from "./VNodes";

@Component({
  directives: {
    "children-differ": ChildrenDiffer
  },
  components: {
    VNodes
  }
})
class VueFlicking extends Vue {
  // Tag of the viewport element
  @Prop({ type: String, default: "div", required: false }) public viewportTag!: string;
  // Tag of the camera element
  @Prop({ type: String, default: "div", required: false }) public cameraTag!: string;
  @Prop({ type: Object, default: () => ({}), required: false }) public options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) public plugins!: Plugin[];

  public panels: VNode[] = [];

  private _initialized = false;
  private _nativeFlicking!: Flicking;
  private _pluginsDiffer!: ListDiffer<Plugin>;
  private _slotDiffer!: ListDiffer<VNode>;
  private _renderInfo: {[key: string]: boolean} = {};
  private _diffResult: DiffResult<VNode>;

  public created() {
    this._initialized = false;
    this._renderInfo = {};

    this._fillKeys();
    this.panels = [...this._getSlots()];
  }

  public mounted() {
    this._pluginsDiffer = new ListDiffer<Plugin>();

    const options = {...this.options, ...{ renderExternal: true }};
    const viewportEl = this.$el as HTMLElement;
    this._nativeFlicking = new Flicking(viewportEl, options);

    const slots = this._getSlots();
    this._slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key!);

    this._bindEvents();
    this._checkPlugins();

    this._initialized = true;

    if (this.options.renderOnlyVisible) {
      this.panels = this._getPanelVNodes();
    }
  }

  public beforeDestroy() {
    this._nativeFlicking.destroy();
  }

  public beforeUpdate() {
    this._fillKeys();

    const slots = this._getSlots();
    const diffResult = this._slotDiffer.update(slots);
    const flicking = this._nativeFlicking;

    if (!this.options.renderOnlyVisible || !flicking) {
      return;
    }

    const removedPanels = diffResult.removed.reduce((map, idx) => {
      map[idx] = true;
      return map;
    }, {});

    this.panels = [
      ...flicking.camera.visiblePanels
        .filter(panel => !removedPanels[panel.index])
        .map(panel => diffResult.prevList[panel.index]),
      ...diffResult.added.map(idx => diffResult.list[idx])
    ];

    this._diffResult = diffResult;
  }

  public updated() {
    const flicking = this._nativeFlicking;
    const renderer = flicking.renderer;

    const slots = this._getSlots();
    const diffResult = this._diffResult;

    diffResult.removed.forEach(idx => {
      renderer.remove(idx, 1);
      console.log("removed", idx);
    });

    diffResult.ordered.forEach(([prevIdx, newIdx]) => {
      const prevPanel = renderer.getPanel(prevIdx);
      const indexDiff = newIdx - prevIdx;
      if (indexDiff > 0) {
        prevPanel.increaseIndex(indexDiff);
      } else {
        prevPanel.decreaseIndex(-indexDiff);
      }
    });

    diffResult.added.forEach(idx => {
      const el = diffResult.list[idx].elm;
      renderer.insert(idx, el);
    })

    this._checkPlugins();

    if (diffResult.added > 0 || diffResult.removed > 0) {
      this.panels = this._getPanelVNodes();
    }

    this._diffResult = null;
  }

  private _bindEvents() {
    const events = Object.values(EVENTS);

    events.forEach(eventName => {
      this._nativeFlicking.on(eventName, (e: any) => {
        e.currentTarget = this;
        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });

    if (this.options.renderOnlyVisible) {
      this._nativeFlicking.on(EVENTS.VISIBLE_CHANGE, e => {
        this.panels = this._getPanelVNodes();
      });
    }
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins);

    this._nativeFlicking.addPlugins(added.map(index => list[index]));
    this._nativeFlicking.removePlugins(removed.map(index => prevList[index]));
  }

  private _getPanelVNodes() {
    const flicking = this._nativeFlicking;
    const slots = this._getSlots();

    let nodes: VNode[];
    if (this.options.renderOnlyVisible) {
      nodes = flicking.camera.visiblePanels.map(panel => slots[panel.index]);
    } else {
      nodes = slots;
    }

    return nodes;
  }

  private _getSlots() {
    // Only elements are allowed as panel
    return this.$slots.default
      ? this.$slots.default.filter(slot => slot.tag)
      : [];
  }

  private _fillKeys() {
    const slots = this._getSlots();

    slots.forEach(slot => {
      slot.key = slot.key ?? uuid.v4();
    });
  }
}

export default VueFlicking;
</script>
<style>
</style>
