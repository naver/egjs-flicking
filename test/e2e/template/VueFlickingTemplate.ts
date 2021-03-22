import { FlickingOptions } from "../../../src";
import { Flicking } from "../../../packages/vue-flicking/src/index";

export default (options: Partial<FlickingOptions>, panels: string[], styles: string[]) => {
  styles.forEach(style => require(`../public/${style}`));

  return {
    components: { Flicking },
    props: ["options"],
    template: `<flicking :options="${JSON.stringify(options).replace(/"/g, "'")}">${panels.join("")}</flicking>`
  };
};
