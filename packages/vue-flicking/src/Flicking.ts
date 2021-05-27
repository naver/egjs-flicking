/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { ComponentEvent } from "@egjs/component";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";

import "@egjs/flicking/dist/flicking.css";

import NativeFlicking, {
  EVENTS,
  FlickingOptions,
  withFlickingMethods,
  sync,
  Plugin,
  Status,
  getRenderingPanels
} from "../../../src/index";

import VueRenderer from "./VueRenderer";
import VuePanelComponent from "./VuePanelComponent";

@Component({
  components: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Panel: VuePanelComponent
  }
})
class Flicking extends Vue {
  // Tag of the viewport element
  @Prop({ type: String, default: "div", required: false }) public viewportTag!: string;
  // Tag of the camera element
  @Prop({ type: String, default: "div", required: false }) public cameraTag!: string;
  @Prop({ type: Object, default: () => ({}), required: false }) public options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) public plugins!: Plugin[];
  @Prop({ type: Object, required: false }) public status!: Status;

  @withFlickingMethods private _nativeFlicking!: NativeFlicking;
  private _pluginsDiffer!: ListDiffer<Plugin>;
  private _slotDiffer!: ListDiffer<VNode>;
  private _diffResult: DiffResult<VNode> | null = null;

  public mounted() {
    const viewportEl = this.$el as HTMLElement;
    const flicking = new NativeFlicking(viewportEl, {
      ...this.options,
      ...{ renderExternal: {
        renderer: VueRenderer,
        rendererOptions: { vueFlicking: this }
      }}
    });
    this._nativeFlicking = flicking;

    if (flicking.initialized) {
      this.$emit(EVENTS.READY, { ...new ComponentEvent(EVENTS.READY), currentTarget: this });
    }

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
    this._nativeFlicking.destroy();
  }

  public beforeMount() {
    this._fillKeys();
  }

  public beforeUpdate() {
    this._fillKeys();

    this._diffResult = this._slotDiffer.update(this._getSlots());
  }

  public updated() {
    const flicking = this._nativeFlicking;
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
    const flicking = this._nativeFlicking;
    const isHorizontal = flicking
      ? flicking.horizontal
      : this.options.horizontal ?? true;

    const viewportData: VNodeData = {
      class: {
        "flicking-viewport": true,
        "vertical": !isHorizontal
      }
    };
    const cameraData: VNodeData = {
      class: {
        "flicking-camera": true
      }
    };

    const slots = this._diffResult
      ? getRenderingPanels(this._nativeFlicking, this._diffResult)
      : this._getSlots();
    const panels = slots.map(slot => h("Panel", { key: slot.key }, [slot]));

    this.$emit("render");

    return h(this.viewportTag, viewportData,
      [h(this.cameraTag, cameraData,
        panels,
      )],
    );
  }

  private _bindEvents() {
    const flicking = this._nativeFlicking;
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

    this._nativeFlicking.addPlugins(...added.map(index => list[index]));
    this._nativeFlicking.removePlugins(...removed.map(index => prevList[index]));
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
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Flicking extends NativeFlicking {}
export default Flicking;
