import DemoCode from "@site/src/component/DemoCode";
import jsHtml from "./index.html?raw";
import reactCode from "./react.jsx?raw";
import panelCSS from "./styles.css?raw";
import jsCode from "./vanilla.js?raw";
import vueCode from "./vue.vue?raw";

export default () => <DemoCode react={reactCode} vue3={vueCode} js={jsCode} jsHtml={jsHtml} css={panelCSS} />;
