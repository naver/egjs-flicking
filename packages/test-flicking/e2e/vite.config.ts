import path from "node:path";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const ROOT = path.resolve(__dirname, "../../..");
const PACKAGES = path.resolve(ROOT, "packages");

export default defineConfig({
  root: path.resolve(__dirname, ".generated"),
  plugins: [react({ include: "**/*.jsx" }), vue()],
  server: {
    port: 3010,
    fs: {
      allow: [ROOT]
    }
  },
  resolve: {
    alias: [
      // CSS: @egjs/*/dist/*.css → 소스 CSS/SASS
      {
        find: /^@egjs\/flicking\/dist\/flicking\.css$/,
        replacement: path.resolve(PACKAGES, "flicking/sass/flicking.sass")
      },
      {
        find: /^@egjs\/react-flicking\/dist\/flicking\.css$/,
        replacement: path.resolve(PACKAGES, "flicking/sass/flicking.sass")
      },
      {
        find: /^@egjs\/vue3-flicking\/dist\/flicking\.css$/,
        replacement: path.resolve(PACKAGES, "flicking/sass/flicking.sass")
      },
      {
        find: /^@egjs\/flicking-plugins\/dist\/(.+\.css)$/,
        replacement: path.resolve(PACKAGES, "flicking-plugins/css/$1")
      },
      // JS: @egjs/* → 로컬 소스
      { find: /^@egjs\/flicking$/, replacement: path.resolve(PACKAGES, "flicking/src/index.ts") },
      {
        find: /^@egjs\/react-flicking$/,
        replacement: path.resolve(PACKAGES, "react-flicking/src/react-flicking/index.ts")
      },
      { find: /^@egjs\/vue3-flicking$/, replacement: path.resolve(PACKAGES, "vue3-flicking/src/index.ts") },
      { find: /^@egjs\/flicking-plugins$/, replacement: path.resolve(PACKAGES, "flicking-plugins/src/index.ts") },
      // 데모 소스 alias
      { find: "@demo", replacement: path.resolve(PACKAGES, "docs/src/demo") }
    ],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue"]
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "vue"]
  }
});
