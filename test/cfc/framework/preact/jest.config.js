const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest/utils");

const { compilerOptions } = require("./tsconfig.spec");
const commonOptions = require("../../common/jest.config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...commonOptions,
  displayName: {
    name: "Preact",
    color: "yellowBright"
  },
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>"
    })
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "\.d\.ts$"
  ],
  transform: {
    "^.+\\.(mjs|js|jsx|ts|tsx)$": path.resolve(__dirname, "babel.js")
  }
};
