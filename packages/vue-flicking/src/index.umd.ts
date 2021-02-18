import { VueConstructor } from "vue";
import VueFlicking from "./Flicking";

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = "#__VERSION__#";
const install = (Vue: VueConstructor): void => {
  Vue.component("Flicking", VueFlicking);
};

const plugin = {
  VueFlicking: Flicking,
  install,
  version,
};
export default plugin;
