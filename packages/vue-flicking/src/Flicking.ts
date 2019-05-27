/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import NativeFlicking, { Plugin, FlickingOptions, withFlickingMethods, DEFAULT_OPTIONS } from "@egjs/flicking";
import ChildrenDiffer from "@egjs/vue-children-differ";
import ListDiffer, { DiffResult } from "@egjs/list-differ";
import { Component, Vue, Prop } from "vue-property-decorator";
import { CreateElement, VNodeData, VNode } from "vue";
import { merge } from "./utils";

@Component({
  name: "Flicking",
  directives: {
    "children-differ": ChildrenDiffer,
  },
})
export default class Flicking extends Vue {
  // Tag of wrapper element
  @Prop({ type: String, default: "div", required: false }) tag!: string;
  @Prop({ type: Object, default: () => ({}), required: false }) options!: Partial<FlickingOptions>;
  @Prop({ type: Array, default: () => ([]), required: false }) plugins!: Plugin[];

  // Following decorator will inject native Flicking's method into Vue-Flicking
  @withFlickingMethods
  private $_nativeFlicking!: NativeFlicking;
  private $_pluginsDiffer!: ListDiffer<Plugin>;
  private $_cloneCount!: number;

  public mounted() {
    this.$_pluginsDiffer = new ListDiffer<Plugin>();
    this.$_cloneCount = 0;

    const options = merge({}, this.options, { renderExternal: true });
    this.$_nativeFlicking = new NativeFlicking(this.$el as HTMLElement, options);

    this.$_bindEvents();
    this.$_checkUpdate();
  }

  public render(h: CreateElement) {
    const classPrefix = this.options.classPrefix || DEFAULT_OPTIONS.classPrefix;
    const viewportData: VNodeData = {
      class: {},
    };
    const cameraData: VNodeData = {
      class: {},
      directives: [{ name: "children-differ", value: this.onUpdate.bind(this) }],
    };
    viewportData.class[`${classPrefix}-viewport`] = true;
    cameraData.class[`${classPrefix}-camera`] = true;

    const panels = this.$_getPanels();

    return h(this.tag,
      [h("div", viewportData,
        [h("div", cameraData,
          panels,
        )],
      )],
    );
  }

  public onUpdate(diffResult: DiffResult<HTMLElement>) {
    this.$_nativeFlicking.sync(diffResult as DiffResult<HTMLElement>);
    this.$nextTick(() => {
      this.$_checkUpdate();
    });
  }

  private $_checkUpdate() {
    this.$_checkPlugins();
    this.$_checkCloneCount();
  }

  private $_bindEvents() {
    const events = Object.keys(NativeFlicking.EVENTS)
      .map(key => NativeFlicking.EVENTS[key]);

    events.forEach(eventName => {
      this.$_nativeFlicking.on(eventName, e => {
        e.currentTarget = this;
        // Make events from camelCase to kebab-case
        this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
      });
    });
  }

  private $_checkPlugins() {
    const { list, added, removed, prevList } = this.$_pluginsDiffer.update(this.plugins);

    this.$_nativeFlicking.addPlugins(added.map(index => list[index]));
    this.$_nativeFlicking.removePlugins(removed.map(index => prevList[index]));
  }

  private $_checkCloneCount() {
    const newCloneCount = this.$_nativeFlicking.getCloneCount();

    if (this.$_cloneCount !== newCloneCount) {
      this.$_cloneCount = newCloneCount;
      this.$forceUpdate();
    }
  }

  private $_getPanels() {
    const lastIndex = this.$_nativeFlicking
      ? this.$_nativeFlicking.getLastIndex()
      : this.options.lastIndex || DEFAULT_OPTIONS.lastIndex;
    const panels = this.$slots.default
      ? [...this.$slots.default.slice(0, lastIndex + 1), ...this.$_getClonedVNodes()]
      : undefined;

    return panels;
  }

  private $_getClonedVNodes() {
    const h = this.$createElement;
    const cloneCount = this.$_cloneCount;
    const children = this.$slots.default!;
    const clones: VNode[] = [];

    for (let cloneIndex = 0; cloneIndex < cloneCount; cloneIndex++) {
      const childKeys = children.map((child, childIdx) => child.key ? child.key : childIdx);
      clones.push(...children.map((child, childIdx) => this.$_cloneVNode(child, h, `clone${cloneIndex}-${childKeys[childIdx]}`)));
    }
    return clones;
  }

  private $_cloneVNode(vnode: VNode, h: CreateElement, key?: string | number): VNode {
    const clonedChilds = vnode.children
      ? vnode.children.map(child => this.$_cloneVNode(child, h))
      : undefined;
    const clone = h(vnode.tag, vnode.data, clonedChilds);
    clone.text = vnode.text;
    clone.isComment = vnode.isComment;
    clone.componentOptions = vnode.componentOptions;
    clone.context = vnode.context;
    clone.ns = vnode.ns;
    clone.isStatic = vnode.isStatic;
    clone.key = key;

    return clone;
  }
}
