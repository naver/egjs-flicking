import { withFlickingMethods } from "@egjs/flicking";

import SvelteFlicking from "./flicking.svelte";

export default (() => {
  withFlickingMethods(SvelteFlicking, "vanillaFlicking");

  return SvelteFlicking;
})();
