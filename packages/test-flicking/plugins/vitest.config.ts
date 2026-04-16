import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../../flicking-plugins/src"),
      "@egjs/flicking": path.resolve(__dirname, "../../flicking/src/index.ts")
    }
  },
  test: {
    name: "plugins",
    environment: "jsdom",
    include: ["./*.spec.ts"],
    setupFiles: [path.resolve(__dirname, "../shared/pre-setup.ts"), path.resolve(__dirname, "./setup.ts")],
    globals: true
  }
});
