/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, { EVENTS, ExternalRenderer, FlickingOptions } from "../../../dist/flicking.esm.js";
import ChildrenDiffer from "@egjs/vue-children-differ";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";
import * as uuid from "uuid";

@Component({
  directives: {
    "children-differ": ChildrenDiffer,
  },
})
class VueFlicking extends Vue {
  // Tag of the viewport element
  @Prop({ type: String, default: "div", required: false }) viewportTag!: string;
  // Tag of the camera element
  @Prop({ type: String, default: "div", required: false }) cameraTag!: string;
  @Prop({ type: Object, default: () => ({}), required: false }) options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) plugins!: Plugin[];

  private _initialized = false;
  private _nativeFlicking!: Flicking;
  private _pluginsDiffer!: ListDiffer<Plugin>;
  private _slotDiffer!: ListDiffer<VNode>;

  public mounted() {
    this._pluginsDiffer = new ListDiffer<Plugin>();

    const options = {...this.options, ...{ renderExternal: true }};
    const viewportEl = this.$el as HTMLElement;
    this._nativeFlicking = new Flicking(viewportEl, options);

    window.f = this._nativeFlicking;

    const slots = this._getSlots();
    this._slotDiffer = new ListDiffer<VNode>(slots, vnode => vnode.key!);

    this._bindEvents();
    this._checkPlugins();

    this._initialized = true;

    if (this.options.renderOnlyVisible) {
      // Should update once to update visibles
      this.$forceUpdate();
    }
  }

  public beforeMount() {
    this._fillKeys();
    this._fillClasses();
  }

  public beforeUpdate() {
    this._fillKeys();
    this._fillClasses();
  }

  public beforeDestroy() {
    this._nativeFlicking.destroy();
  }

  public render(h: CreateElement) {
    const classPrefix = "flicking";
    const viewportData: VNodeData = {
      class: {},
    };
    const cameraData: VNodeData = {
      class: {},
      directives: [{ name: "children-differ", value: this.onUpdate.bind(this) }],
    };
    viewportData.class[`${classPrefix}-viewport`] = true;
    cameraData.class[`${classPrefix}-camera`] = true;

    const panels = this._getPanelElements(h);

    return h(this.viewportTag, viewportData,
      [h(this.cameraTag, cameraData,
        panels,
      )],
    )
  }

  public onUpdate(diffResult: DiffResult<HTMLElement>) {
    const flicking = this._nativeFlicking;
    const renderer = flicking.renderer as unknown as ExternalRenderer;

    diffResult.removed.forEach(idx => {
      renderer.remove(idx, 1);
    });

    diffResult.ordered.forEach(idx => {

    });

    diffResult.added.forEach(idx => {
      const el = diffResult.list[idx];
      renderer.insert(idx, el);
    })

    this._checkPlugins();
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
        this.$forceUpdate();
      });
    }
  }

  private _checkPlugins() {
    const { list, added, removed, prevList } = this._pluginsDiffer.update(this.plugins);

    this._nativeFlicking.addPlugins(added.map(index => list[index]));
    this._nativeFlicking.removePlugins(removed.map(index => prevList[index]));
  }

  private _getPanelElements(h: CreateElement) {
    const flicking = this._nativeFlicking;
    const slots = this._getSlots();

    console.log(slots);

    if (!this._initialized) return slots;

    let panels: VNode[];
    if (this.options.renderOnlyVisible) {
      const indexesToRender = flicking.camera.visiblePanels.map(panel => panel.index);
      panels = indexesToRender.map(index => slots[index]);
    } else {
      panels = slots;
    }

    return panels;
  }

  private _getSlots() {
    // Only elements are allowed as panel
    return this.$slots.default
      ? this.$slots.default.filter(slot => slot.tag)
      : [];
  }

  private _fillKeys() {
    this._getSlots().forEach(node => {
      if (node.key == null) {
        node.key = uuid.v1();
      }
    });
  }

  private _fillClasses() {
    this._getSlots().forEach(node => {
      if (node.data?.class) {
        node.data.class["flicking-panel"] = true;
      } else if (node.data) {
        node.data.class = {
          "flicking-panel": true
        };
      } else {
        node.data = {
          class: "flicking-panel"
        };
      }
    });
  }
}

export default VueFlicking;
