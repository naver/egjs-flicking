/* eslint-disable @typescript-eslint/naming-convention */
import { VueConstructor } from "vue";

import Flicking from "./Flicking.vue";

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = "#__VERSION__#";
const install = (Vue: VueConstructor): void => {
  Vue.component("Flicking", Flicking);
};

const plugin = {
  Flicking,
  install,
  version
};
export default plugin;
export {
  version,
  Flicking,
  install
};
export * from "@egjs/flicking";
