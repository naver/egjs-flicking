import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@common/renderer": path.resolve(__dirname, "./Vue3FixtureRenderer.tsx"),
      "@egjs/flicking": path.resolve(__dirname, "../../../../flicking/src/index.ts"),
      "@egjs/vue3-flicking": path.resolve(__dirname, "../../../../vue3-flicking/src/index.ts"),
      "@egjs/flicking-plugins": path.resolve(__dirname, "../../../../flicking-plugins/src/index.ts")
    }
    // Note: resolve.conditions for Vue3 is handled by server.deps.inline instead
    // to avoid forcing CJS resolution globally (which breaks @testing-library/jest-dom/vitest)
  },
  test: {
    name: "Vue3",
    environment: "jsdom",
    root: path.resolve(__dirname, "../.."),
    include: ["suite/**/*.spec.{ts,tsx}"],
    setupFiles: [path.resolve(__dirname, "../../../shared/pre-setup.ts"), path.resolve(__dirname, "./setup.ts")],
    globals: true,
    server: {
      deps: {
        inline: ["vue", "@vue/test-utils"]
      }
    }
  }
});
