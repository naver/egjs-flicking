/* eslint-disable @typescript-eslint/naming-convention */
import Vue from "vue";

import Flicking from "./Flicking";


const version = "#__VERSION__#";
const install = (vue: Vue.App): void => {
  vue.component("Flicking", Flicking);
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
export * from "@egjs/flicking/src/exports";
