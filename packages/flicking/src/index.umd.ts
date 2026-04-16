/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

import * as CrossFlicking from "./CrossFlicking";
import * as Camera from "./camera";
import * as Values from "./constants/values";
import * as Control from "./control";
import * as Core from "./core";
import * as Events from "./event/names";
import Flicking from "./Flicking";
import * as Renderer from "./renderer";

// eslint-disable-next-line @typescript-eslint/naming-convention
const Constants = { ...Events, ...Values };

import * as CFC from "./cfc";
import * as FlickingReactiveAPI from "./reactive";
import * as Utils from "./utils";
import { merge } from "./utils";

merge(Flicking, Core);
merge(Flicking, Camera);
merge(Flicking, Control);
merge(Flicking, Renderer);
merge(Flicking, Constants);
merge(Flicking, CFC);
merge(Flicking, Utils);
merge(Flicking, CrossFlicking);
merge(Flicking, FlickingReactiveAPI);

export default Flicking;
