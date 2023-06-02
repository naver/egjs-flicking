/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking, * as modules from "./index";

for (const name in modules) {
  (Flicking as any)[name] = (modules as any)[name];
}

declare const module: any;
module.exports = Flicking;
export default Flicking;
export * from "./index";
