import Flicking from "../../../packages/vue3-flicking/src/index";
import "../../../css/flicking.css";
import { Fixture } from "../types";

export default (fixture: Fixture) => {
  const { options, panels, styles } = fixture;

  styles.forEach(style => require(`../public/${style}`));

  return {
    components: { Flicking: Flicking as any },
    props: ["options"],
    template: `<flicking :options="${JSON.stringify(options).replace(/"/g, "'")}">
      ${panels.map(panel => `<${panel.tag} class="${panel.class}">${panel.text}</${panel.tag}>`).join("")}
    </flicking>`
  };
};
