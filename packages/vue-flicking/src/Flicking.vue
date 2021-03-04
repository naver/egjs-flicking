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
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";
import * as uuid from "uuid";

import Flicking, { EVENTS, FlickingOptions } from "../../../src/index";
import VNodes from "./VNodes";

@Component({
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
  private _pluginsDiffer!: ListDiffer<any>;
  private _slotDiffer!: ListDiffer<VNode>;
  private _renderInfo: {[key: string]: boolean} = {};
  private _diffResult: DiffResult<VNode>;

  public created() {
    this._initialized = false;
    this._renderInfo = {};

    const slots = this._getSlots();
    this._checkKeys(slots);
    this.panels = [...slots];
  }

  public mounted() {
    const options = {...this.options, ...{ renderExternal: true }};
    const viewportEl = this.$el as HTMLElement;
    this._nativeFlicking = new Flicking(viewportEl, options);

    const slots = this._getSlots();
    this._slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key!);
    this._pluginsDiffer = new ListDiffer<Plugin>();

    this._bindEvents();
    this._checkPlugins();

    this._initialized = true;

    this.$forceUpdate();
  }

  public beforeDestroy() {
    this._nativeFlicking.destroy();
  }

  public beforeUpdate() {
    const slots = this._getSlots();
    const diffResult = this._slotDiffer.update(slots);
    const flicking = this._nativeFlicking!;

    this._diffResult = diffResult;
    this._checkKeys(diffResult.added.map(idx => diffResult.list[idx]));

    const removedPanels = diffResult.removed.reduce((map, idx) => {
      map[idx] = true;
      return map;
    }, {});

    const panelsToRender = this.options.renderOnlyVisible
      ? flicking.camera.visiblePanels
      : flicking.renderer.panels;

    this.panels = [
      ...panelsToRender
        .filter(panel => !removedPanels[panel.index])
        // Sort panels by position
        .sort((panel1, panel2) => (panel1.position + panel1.offset) - (panel2.position + panel2.offset))
        .map(panel => diffResult.prevList[panel.index]),
      ...diffResult.added.map(idx => diffResult.list[idx])
    ];
  }

  public updated() {
    const flicking = this._nativeFlicking;
    const renderer = flicking.renderer;

    const diffResult = this._diffResult;

    diffResult.removed.forEach(idx => {
      renderer.remove(idx, 1);
    });

    diffResult.ordered.forEach(([prevIdx, newIdx]) => {
      const prevPanel = renderer.getPanel(prevIdx);
      const indexDiff = newIdx - prevIdx;

      if (indexDiff > 0) {
        prevPanel.increaseIndex(indexDiff);
      } else {
        prevPanel.decreaseIndex(-indexDiff);
      }
      // Update position
      prevPanel.resize();
    });

    if (diffResult.added.length > 0) {
      const childNodes = this._vnode.children[0].children.reduce((childMap, child) => {
        childMap[child.key] = child;
        return childMap;
      }, {});

      diffResult.added.forEach(idx => {
        const el = childNodes[diffResult.list[idx].key].elm;
        renderer.insert(idx, el);
      });
    };

    this._checkPlugins();

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.panels = this._getPanelVNodes();
    }

    this._diffResult = null;
  }

  private _bindEvents() {
    const flicking = this._nativeFlicking;
    const events = Object.values(EVENTS);

    events.forEach(eventName => {
      flicking.on(eventName, (e: any) => {
        e.currentTarget = this;
        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });

    if (this.options.renderOnlyVisible) {
      flicking.on(EVENTS.VISIBLE_CHANGE, e => {
        this.$forceUpdate();
      });
    } else if (this.options.circular) {
      flicking.renderer.elementManipulator.on("orderChanged", e => {
        this.$forceUpdate();
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

  private _checkKeys(vnodes: VNode[]) {
    vnodes.forEach(node => {
      if (node.key == null) {
        throw new Error("'key' should be provided for every panel of Flicking.");
      }
    });
  }
}

export default VueFlicking;
</script>
<style>
@import url("../../../dist/flicking.css");
</style>
