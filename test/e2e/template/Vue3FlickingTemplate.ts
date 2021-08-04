import { FlickingOptions } from "../../../src";
import Flicking from "../../../packages/vue3-flicking/src/index";
import "../../../css/flicking.css";

export default (options: Partial<FlickingOptions>, panels: string[], styles: string[]) => {
  styles.forEach(style => require(`../public/${style}`));

  return {
    components: { Flicking: Flicking as any },
    props: ["options"],
    template: `<flicking :options="${JSON.stringify(options).replace(/"/g, "'")}">${panels.join("")}</flicking>`
  };
};
