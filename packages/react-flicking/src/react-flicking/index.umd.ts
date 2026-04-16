/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "./Flicking";
import { useFlickingReactiveAPI } from "./reactive";
import ViewportSlot from "./ViewportSlot";

(Flicking as any).ViewportSlot = ViewportSlot;
(Flicking as any).useFlickingReactiveAPI = useFlickingReactiveAPI;
export default Flicking;
