require("jest-preset-angular/ngcc-jest-processor");

const { pathsToModuleNameMapper } = require("ts-jest/utils");

const { compilerOptions } = require("./tsconfig.spec");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/"],
  testMatch: [
    "/**/*.spec.[jt]s?(x)"
  ],
  globalSetup: "<rootDir>/global-setup.ts",
  globalTeardown: "<rootDir>/global-teardown.ts",
  setupFilesAfterEnv: ["<rootDir>/setup.ts"],
  collectCoverage: true,
  coverageReporters: ["html"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>"
    }),
    "@egjs/component": "<rootDir>/node_modules/@egjs/component",
    "@egjs/list-differ": "<rootDir>/node_modules/@egjs/list-differ"
  },
  moduleFileExtensions: ["ts", "html", "js", "json", "tsx", "svelte"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }]
  }
};
