/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "./Flicking";
import * as Core from "./core";
import * as Camera from "./camera";
import * as Control from "./control";
import * as Renderer from "./renderer";
import * as Constants from "./const/external";
import * as CFC from "./cfc";
import * as Utils from "./utils";
import { merge } from "./utils";

merge(Flicking, Core);
merge(Flicking, Camera);
merge(Flicking, Control);
merge(Flicking, Renderer);
merge(Flicking, Constants);
merge(Flicking, CFC);
merge(Flicking, Utils);

export default Flicking;
