const path = require("path");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: path.resolve(__dirname, ".."),
  roots: ["<rootDir>/", path.resolve(__dirname, "../suite")],
  testMatch: [
    "**/*.spec.[jt]s?(x)"
  ],
  globalSetup: path.resolve(__dirname, "./global-setup.ts"),
  globalTeardown:  path.resolve(__dirname, "./global-teardown.ts"),
  setupFilesAfterEnv: ["<rootDir>/setup.ts"],
  collectCoverage: true,
  coverageReporters: ["lcov"],
  collectCoverageFrom: [
    "<rootDir>/lib/@egjs/**/*",
    "!**/node_modules/**"
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "html", "js", "json", "tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ontouchstart": null,
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json"
    }
  }
};
