import { flickingReactiveAPIAdapter } from "@egjs/flicking";
import { RefObject } from "react";
import Flicking from "./Flicking";
import { useReactive } from "@cfcs/react";

export const useFlickingReactiveAPI = (flickingRef: RefObject<Flicking>) => {
  return useReactive(flickingReactiveAPIAdapter, () => ({
    flicking: flickingRef.current,
  }))
}
