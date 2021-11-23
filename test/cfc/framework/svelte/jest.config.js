const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest/utils");

const { compilerOptions } = require("./tsconfig.spec");
const commonOptions = require("../../common/jest.config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...commonOptions,
  displayName: {
    name: "Svelte",
    color: "magentaBright"
  },
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>"
    })
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "svelte-fixture",
    "src/.+\.svelte",
    "\.json$"
  ],
  moduleFileExtensions: [...commonOptions.moduleFileExtensions, "svelte"],
  transform: {
    ...commonOptions.transform,
    "^.+\\.js$": path.resolve(__dirname, "babel.js"),
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: path.resolve(__dirname, "./svelte.config.js")
      }
    ]
  }
};
