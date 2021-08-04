import { FlickingOptions } from "../../../src";
import "../../../css/flicking.css";
import Flicking, { FlickingPanel } from "../../../packages/svelte-flicking/src";
import SvelteFlicking from "./SvelteFlicking.svelte";

export default (options: Partial<FlickingOptions>, panels: string[], styles: string[]) => {
  styles.forEach(style => require(`../public/${style}`));

  return {
    Component: SvelteFlicking,
    data: {
      options,
      panels
    }
  };
};
