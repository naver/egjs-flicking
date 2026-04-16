import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@common/renderer": path.resolve(__dirname, "./VanillaFixtureRenderer.tsx"),
      "@egjs/flicking": path.resolve(__dirname, "../../../../flicking/src/index.ts"),
      "@egjs/flicking-plugins": path.resolve(__dirname, "../../../../flicking-plugins/src/index.ts")
    }
  },
  test: {
    name: "Vanilla",
    environment: "jsdom",
    root: path.resolve(__dirname, "../.."),
    include: ["suite/**/*.spec.{ts,tsx}"],
    setupFiles: [path.resolve(__dirname, "../../../shared/pre-setup.ts"), path.resolve(__dirname, "./setup.ts")],
    globals: true
  }
});
