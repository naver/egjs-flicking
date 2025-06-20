import { flickingReactiveAPIAdapter } from "@egjs/flicking";
import { Ref } from "@vue/composition-api";
import { useReactive } from "@cfcs/vue2";

import Flicking from "./Flicking";


export const useFlickingReactiveAPI = (flickingRef: Ref<Flicking>) => {
  return useReactive(flickingReactiveAPIAdapter, () => ({
    flicking: flickingRef.value
  }));
};
