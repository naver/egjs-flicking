import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "./framework/vanilla/vitest.config.ts",
      "./framework/react/vitest.config.ts",
      "./framework/vue3/vitest.config.ts"
    ]
  }
});
