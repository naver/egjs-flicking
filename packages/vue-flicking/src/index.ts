import { VueConstructor } from "vue";
import VueFlicking from "./Flicking";

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

export const version = "#__VERSION__#";
export const Flicking = VueFlicking;

export const install = (Vue: VueConstructor): void => {
  Vue.component("Flicking", Flicking);
};

const plugin = {
  Flicking,
  install,
  version,
};
export default plugin;
