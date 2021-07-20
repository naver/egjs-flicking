import VanillaFlicking, { withFlickingMethods } from "@egjs/flicking";

import SvelteFlicking from "./flicking.svelte";

class Flicking extends SvelteFlicking {
  @withFlickingMethods
  public vanillaFlicking: VanillaFlicking | null = null;
}

interface Flicking extends SvelteFlicking, VanillaFlicking {}

export default Flicking;
