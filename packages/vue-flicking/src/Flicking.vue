<template>
  <component :is="this.viewportTag" class="flicking-viewport">
    <component :is="this.cameraTag" class="flicking-camera">
      <VNodes :vnodes="_panels" />
    </component>
  </component>
</template>
<script lang="ts">
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import NativeFlicking, { EVENTS, FlickingOptions, withFlickingMethods, sync, getRenderingPanels } from "../../../src/index";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { VNode } from "vue";

import VNodes from "./VNodes";

@Component({
  components: {
    VNodes
  }
})
class Flicking extends Vue {
  // Tag of the viewport element
  @Prop({ type: String, default: "div", required: false }) public viewportTag!: string;
  // Tag of the camera element
  @Prop({ type: String, default: "div", required: false }) public cameraTag!: string;
  @Prop({ type: Object, default: () => ({}), required: false }) public options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) public plugins!: Plugin[];

  private _panels: VNode[] = [];

  @withFlickingMethods private _nativeFlicking!: NativeFlicking;
  private _pluginsDiffer!: ListDiffer<any>;
  private _slotDiffer!: ListDiffer<VNode>;
  private _diffResult: DiffResult<VNode> | null = null;

  public created() {
    this._fillKeys();

    const slots = this._getSlots();
    this._panels = [...slots];
  }

  public mounted() {
    const options = {...this.options, ...{ renderExternal: true }};
    const viewportEl = this.$el as HTMLElement;
    this._nativeFlicking = new NativeFlicking(viewportEl, options);

    const slots = this._getSlots();
    this._slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key!);
    this._pluginsDiffer = new ListDiffer<Plugin>();

    this._bindEvents();
    this._checkPlugins();

    this.$forceUpdate();
  }

  public beforeDestroy() {
    this._nativeFlicking.destroy();
  }

  public beforeUpdate() {
    this._fillKeys();

    const slots = this._getSlots();
    const diffResult = this._slotDiffer.update(slots);
    const flicking = this._nativeFlicking!;

    this._diffResult = diffResult;
    this._panels = getRenderingPanels(flicking, diffResult);
  }

  public updated() {
    const flicking = this._nativeFlicking;
    const diffResult = this._diffResult;

    if (!diffResult) return;

    sync(flicking, diffResult);

    this._checkPlugins();

    if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
      this.$forceUpdate();
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
    }
    if (this.options.circular) {
      flicking.renderer.elementManipulator.on("orderChanged", () => {
        this.$forceUpdate();
      });
    }
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins);

    this._nativeFlicking.addPlugins(added.map(index => list[index]));
    this._nativeFlicking.removePlugins(removed.map(index => prevList[index]));
  }

  private _getSlots() {
    // Only elements are allowed as panel
    return this.$slots.default
      ? this.$slots.default.filter(slot => slot.tag)
      : [];
  }

  private _fillKeys() {
    const vnodes = this._getSlots();

    vnodes.forEach((node, idx) => {
      if (node.key == null) {
        node.key = `$_${idx}`;
      }
    });
  }
}

interface Flicking extends NativeFlicking {}
export default Flicking;
</script>
<style>
@import url("../node_modules/@egjs/flicking/dist/flicking.css");
</style>
