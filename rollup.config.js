/* eslint-disable @typescript-eslint/no-var-requires */

const buildHelper = require("./config/build-helper");

const external = {
  "@egjs/axes": "eg.Axes",
  "@egjs/component": "eg.Component",
  "@egjs/imready": "eg.ImReady"
};
const name = "Flicking";

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/flicking.js",
    format: "umd",
    external
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/flicking.min.js",
    format: "umd",
    uglify: true,
    external
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/flicking.pkgd.js",
    format: "umd",
    resolve: true
  },
  {
    name,
    input: "./src/index.umd.ts",
    output: "./dist/flicking.pkgd.min.js",
    format: "umd",
    resolve: true,
    uglify: true
  },
  {
    input: "./src/index.ts",
    output: "./dist/flicking.esm.js",
    format: "esm",
    external,
    exports: "named"
  }
]);

