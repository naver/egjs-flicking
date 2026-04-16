import path from "node:path";
import { fileURLToPath } from "node:url";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: "~", replacement: path.resolve(__dirname, "../../flicking/src") },
      { find: "@egjs/axes", replacement: path.resolve(__dirname, "../../flicking/node_modules/@egjs/axes") },
      {
        find: "@egjs/list-differ",
        replacement: path.resolve(__dirname, "../../flicking/node_modules/@egjs/list-differ")
      }
    ]
  },
  test: {
    name: "unit",
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        {
          browser: "chromium",
          viewport: { width: 640, height: 480 }
        }
      ]
    },
    include: [path.resolve(__dirname, "./**/*.spec.ts"), path.resolve(__dirname, "./**/*.spec.tsx")],
    exclude: ["**/node_modules/**"],
    setupFiles: [path.resolve(__dirname, "../shared/pre-setup.ts"), path.resolve(__dirname, "./setup.ts")],
    globals: true,
    testTimeout: 30000,
    css: true
  }
});
