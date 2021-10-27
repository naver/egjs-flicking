/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "../../../Flicking";

import ElementProvider from "./ElementProvider";

interface ExternalElementProvider extends ElementProvider {
  rendered: boolean;
  show(flicking: Flicking): any;
  hide(flicking: Flicking): any;
}

export default ExternalElementProvider;
