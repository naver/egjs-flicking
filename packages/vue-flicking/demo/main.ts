import Vue from "vue";
import VueRouter from "vue-router";
import VueCompositionAPI from "@vue/composition-api";

import VueFlicking from "../src/index";

import App from "./Demo.vue";
import routerOption from "./router";

import "@egjs/flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

Vue.use(VueCompositionAPI);
Vue.use(VueRouter);
Vue.use(VueFlicking);

Vue.config.productionTip = false;

const router = new VueRouter(routerOption);

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
