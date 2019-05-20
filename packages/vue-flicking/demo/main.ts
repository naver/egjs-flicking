import Vue, { VueConstructor } from "vue";
import App from "./Demo.vue";
import Flicking from "../src/index";

Vue.use<VueConstructor>(Flicking);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
