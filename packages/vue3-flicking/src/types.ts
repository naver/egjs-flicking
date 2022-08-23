import { ComponentOptionsMixin, DefineComponent, VNode } from "vue";
import VanillaFlicking, {
  Plugin,
  Status,
  FlickingOptions,
  FlickingEvents
} from "@egjs/flicking";
import Component from "@egjs/component";
import ListDiffer, { DiffResult } from "@egjs/list-differ";

import FlickingProps from "./FlickingProps";

export interface FlickingData {
  renderEmitter: Component<{ render: void }>;
  vanillaFlicking: VanillaFlicking;
  pluginsDiffer: ListDiffer<Plugin>;
  slotDiffer: ListDiffer<VNode>;
  diffResult: DiffResult<VNode> | null;
}

type VueFlickingEmits = {
  [key in keyof FlickingEvents]: (evt: FlickingEvents[key]) => any;
};

/* eslint-disable @typescript-eslint/indent */
export type VueFlicking = DefineComponent<
  typeof FlickingProps,
  // RawBindings
  unknown,
  // Data
  FlickingData,
  // Computed
  {},
  // Methods
  {},
  // Mixin
  ComponentOptionsMixin,
  // Extends
  ComponentOptionsMixin,
  // Emits
  VueFlickingEmits,
  string,
  // Public Props
  import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps,
  // Props
  Readonly<{
    viewportTag?: unknown;
    cameraTag?: unknown;
    cameraClass?: unknown;
    hideBeforeInit?: unknown;
    firstPanelSize?: unknown;
    options?: unknown;
    plugins?: unknown;
    status?: unknown;
  } & {
    viewportTag: string;
    cameraTag: string;
    cameraClass: string;
    hideBeforeInit: boolean;
    options: Partial<FlickingOptions>;
    plugins: Plugin[];
  } & {
    firstPanelSize?: string;
    status?: Status;
  } & {
    [K in keyof VueFlickingEmits as `on${Capitalize<K>}`]?: VueFlickingEmits[K];
  }>,
  // Defaults
  {
    viewportTag: string;
    cameraTag: string;
    cameraClass: string;
    hideBeforeInit: boolean;
    options: Partial<FlickingOptions>;
    plugins: Plugin[];
  }
>;
/* eslint-enable @typescript-eslint/indent */
