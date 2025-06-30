import { createApp } from "vue";

import router from "./router";
import MainApp from "./MainApp.vue";
import "../node_modules/@egjs/flicking/dist/flicking.css";
import "../node_modules/@egjs/flicking-plugins/dist/flicking-plugins.css";

const app = createApp(MainApp);
app.use(router);
app.mount("#app");
