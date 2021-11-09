const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest/utils");

const { compilerOptions } = require("./tsconfig.spec");
const commonOptions = require("../../common/jest.config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...commonOptions,
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>"
    })
  },
  moduleFileExtensions: [...commonOptions.moduleFileExtensions, "svelte"],
  transform: {
    ...commonOptions.transform,
    "^.+\\.js$": "babel-jest",
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: path.resolve(__dirname, "./svelte.config.js")
      }
    ]
  }
};
