/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Flicking from "./Flicking";
import * as Core from "./core";
import * as Camera from "./camera";
import * as Control from "./control";
import * as Renderer from "./renderer";
import { merge, withFlickingMethods } from "./utils";
import { DEFAULT_OPTIONS, MOVE_TYPE } from "./consts";

merge(Flicking, Core);
merge(Flicking, Camera);
merge(Flicking, Control);
merge(Flicking, Renderer);

(Flicking as any).withFlickingMethods = withFlickingMethods;
(Flicking as any).DEFAULT_OPTIONS = DEFAULT_OPTIONS;
(Flicking as any).MOVE_TYPE = MOVE_TYPE;

export default Flicking;
