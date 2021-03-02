import { VueConstructor } from "vue";
import VueFlicking from "./Flicking";
import VuePanel from "./Panel";

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = "#__VERSION__#";
const install = (Vue: VueConstructor): void => {
  Vue.component("Flicking", VueFlicking);
  Vue.component("Panel", VuePanel);
};

const plugin = {
  Flicking: VueFlicking,
  Panel: VuePanel,
  install,
  version
};
export default plugin;
export {
  version,
  VueFlicking as Flicking,
  VuePanel as Panel,
  install
};
