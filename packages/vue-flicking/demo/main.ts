import Vue from "vue";
import VueRouter from "vue-router";
import VueFlicking from "../src/index";
import App from "./Demo.vue";
import routerOption from "./router";

Vue.use(VueRouter);
Vue.use(VueFlicking);

Vue.config.productionTip = false;

const router = new VueRouter(routerOption);

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
