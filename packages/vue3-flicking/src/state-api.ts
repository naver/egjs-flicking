import { flickingStateApiAdapter } from "@egjs/flicking";
import { Ref } from "vue";
import { useReactive } from "@cfcs/vue3";

import Flicking from "./Flicking";


export const useFlickingStateApi = (flickingRef: Ref<Flicking>) => {
  return useReactive(flickingStateApiAdapter, () => ({
    flicking: flickingRef.value
  }));
};
