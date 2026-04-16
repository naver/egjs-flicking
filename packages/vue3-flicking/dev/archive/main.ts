import { createApp } from "vue";
import MainApp from "./MainApp.vue";
import router from "./router";

// CSS imports
import "@dev/flicking-css";
import "@dev/plugins-css";

// @ts-expect-error - injected by vite
const buildMode = __DEV__ ? "source" : "build";
console.log(`🔧 Vue3 Flicking Dev - ${buildMode} 모드`);

const app = createApp(MainApp);
app.use(router);
app.mount("#app");
