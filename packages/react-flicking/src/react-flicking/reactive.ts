import { FlickingReactiveAPIAdapter } from "@egjs/flicking";
import { RefObject } from "react";
import Flicking from "./Flicking";
import { useReactive } from "@cfcs/react";

export const useFlickingReactiveAPI = (flickingRef: RefObject<Flicking>) => {
  console.log("??", FlickingReactiveAPIAdapter);
  return useReactive(FlickingReactiveAPIAdapter, () => ({
    flicking: flickingRef.current,
  }))
}
