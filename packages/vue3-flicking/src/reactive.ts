import { FlickingReactiveAPIAdapter } from "@egjs/flicking";
import { Ref } from "vue";
import { useReactive } from "@cfcs/vue3";

import Flicking from "./Flicking";


export const useFlickingReactiveAPI = (flickingRef: Ref<Flicking>) => {
  return useReactive(FlickingReactiveAPIAdapter, () => ({
    flicking: flickingRef.value
  }));
};
