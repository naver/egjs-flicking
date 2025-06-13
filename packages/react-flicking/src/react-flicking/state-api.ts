import {flickingStateApiAdapter} from "@egjs/flicking";
import { RefObject } from "react";
import Flicking from "./Flicking";
import { useReactive } from "@cfcs/react";

export const useFlickingStateApi = (flickingRef: RefObject<Flicking>) => {
  return useReactive(flickingStateApiAdapter, () => ({
    flicking: flickingRef.current,
  }))
}