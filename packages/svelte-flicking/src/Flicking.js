/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { withFlickingMethods } from "@egjs/flicking";

import SvelteFlicking from "./flicking.svelte";

if (SvelteFlicking.prototype) {
  withFlickingMethods(SvelteFlicking.prototype, "vanillaFlicking");
}

export default SvelteFlicking;
