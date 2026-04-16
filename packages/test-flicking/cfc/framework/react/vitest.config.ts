import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@common/renderer": path.resolve(__dirname, "./ReactFixtureRenderer.tsx"),
      "@egjs/flicking": path.resolve(__dirname, "../../../../flicking/src/index.ts"),
      "@egjs/react-flicking": path.resolve(__dirname, "../../../../react-flicking/src/react-flicking/index.ts"),
      "@egjs/flicking-plugins": path.resolve(__dirname, "../../../../flicking-plugins/src/index.ts")
    }
  },
  test: {
    name: "React",
    environment: "jsdom",
    root: path.resolve(__dirname, "../.."),
    include: ["suite/**/*.spec.{ts,tsx}"],
    setupFiles: [path.resolve(__dirname, "../../../shared/pre-setup.ts"), path.resolve(__dirname, "./setup.ts")],
    globals: true
  }
});
