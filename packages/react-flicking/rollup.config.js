const buildHelper = require("../../config/build-helper");

const defaultOptions = {
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    input: "./src/react-flicking/index.ts",
    format: "esm",
    output: "./dist/flicking.esm.js",
    exports: "named"
  },
  {
    ...defaultOptions,
    input: "./src/react-flicking/index.umd.ts",
    format: "cjs",
    output: "./dist/flicking.cjs.js"
  },
]);
