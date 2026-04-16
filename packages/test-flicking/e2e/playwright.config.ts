import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: "http://localhost:3010",
    viewport: { width: 640, height: 480 },
    trace: "on-first-retry"
  },

  webServer: {
    command: "node generate-test-harness.mjs && npx vite --port 3010",
    port: 3010,
    reuseExistingServer: !process.env.CI
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
