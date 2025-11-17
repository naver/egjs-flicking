const buildHelper = require("./config/build-helper");

export default buildHelper([
  {
    name: "Flicking",
    input: "./src/index.umd.ts",
    output: "./dist/flicking.pkgd.js",
    format: "umd",
    resolve: true
  }
]);

