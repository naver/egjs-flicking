/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "./Flicking";
import ViewportSlot from "./ViewportSlot";
import { useFlickingReactiveAPI } from "./reactive";

(Flicking as any).ViewportSlot = ViewportSlot;
(Flicking as any).useFlickingReactiveAPI = useFlickingReactiveAPI;
export default Flicking;
