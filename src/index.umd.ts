import Flicking from "./Flicking";
import { withFlickingMethods } from "./utils";
import { DEFAULT_OPTIONS, MOVE_TYPE } from "./consts";

(Flicking as any).withFlickingMethods = withFlickingMethods;
(Flicking as any).DEFAULT_OPTIONS = DEFAULT_OPTIONS;
(Flicking as any).MOVE_TYPE = MOVE_TYPE;
export default Flicking;
