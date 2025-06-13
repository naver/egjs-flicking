import { flickingStateApiAdapter } from "@egjs/flicking";
import { Ref } from "vue";
import { useReactive } from "@cfcs/vue2";

import Flicking from "./Flicking";


export const useFlickingStateApi = (flickingRef: Ref<Flicking>) => {
  return useReactive(flickingStateApiAdapter, () => ({
    flicking: flickingRef.value
  }));
};
