import { useReactive } from "@cfcs/vue3";
import { FlickingReactiveAPIOptions, flickingReactiveAPIAdapter } from "@egjs/flicking";
import { Ref } from "vue";

import Flicking from "./Flicking";

export const useFlickingReactiveAPI = (flickingRef: Ref<Flicking>, options?: FlickingReactiveAPIOptions) => {
  return useReactive(flickingReactiveAPIAdapter, () => ({
    flicking: flickingRef.value ?? undefined,
    options
  }));
};
