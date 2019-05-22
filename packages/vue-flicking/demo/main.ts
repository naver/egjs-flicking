import Vue, { VueConstructor } from "vue";
import VueRouter from "vue-router";
import VueHljs from "vue-hljs";
import VueFlicking from "../src/index";
import App from "./Demo.vue";

Vue.use(VueRouter);
Vue.use(VueFlicking);
Vue.use(VueHljs);

Vue.config.productionTip = false;

import Align from "./features/Align.vue";
import Bound from "./features/Bound.vue";
import FreeScroll from "./features/FreeScroll.vue";
import Gap from "./features/Gap.vue";
import Progress from "./features/Progress.vue";
import Snap from "./features/Snap.vue";
import VariableSize from "./features/VariableSize.vue";
import Infinite from "./features/Infinite.vue";

const router = new VueRouter({
  routes: [
    {
      path: "/align",
      name: "Align",
      component: Align,
    },
    {
      path: "/bound",
      name: "Bound",
      component: Bound,
    },
    {
      path: "/freeScroll",
      name: "FreeScroll",
      component: FreeScroll,
    },
    {
      path: "/gap",
      name: "Gap",
      component: Gap,
    },
    {
      path: "/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/snap",
      name: "Snap",
      component: Snap,
    },
    {
      path: "/variable",
      name: "VariableSize",
      component: VariableSize,
    },
    {
      path: "/infinite",
      name: "Infinite",
      component: Infinite,
    },
  ],
});

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
