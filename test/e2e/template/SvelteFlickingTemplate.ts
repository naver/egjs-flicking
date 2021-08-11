import "../../../css/flicking.css";
import SvelteFlicking from "./SvelteFlicking.svelte";
import { Fixture } from "../types";

export default (fixture: Fixture) => {
  const { options, panels, styles } = fixture;

  styles.forEach(style => require(`../public/${style}`));

  return {
    Component: SvelteFlicking,
    props: {
      options,
      panels
    }
  };
};
