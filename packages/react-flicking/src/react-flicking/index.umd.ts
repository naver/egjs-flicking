/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import Flicking from "./Flicking";
import ViewportSlot from "./ViewportSlot";
import { useFlickingStateApi } from "./state-api";

(Flicking as any).ViewportSlot = ViewportSlot;
(Flicking as any).useFlickingStateApi = useFlickingStateApi;
export default Flicking;
