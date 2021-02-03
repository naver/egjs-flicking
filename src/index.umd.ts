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
import { merge } from "./utils";
// import { DEFAULT_OPTIONS, MOVE_TYPE } from "./consts";

merge(Flicking, Core);
merge(Flicking, Camera);
merge(Flicking, Control);
merge(Flicking, Renderer);
merge(Flicking, Constants);

// (Flicking as any).withFlickingMethods = withFlickingMethods;
// (Flicking as any).DEFAULT_OPTIONS = DEFAULT_OPTIONS;
// (Flicking as any).MOVE_TYPE = MOVE_TYPE;

export default Flicking;
