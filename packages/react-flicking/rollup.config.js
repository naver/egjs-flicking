const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  input: "./src/react-flicking/index.ts",
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    output: "./dist/flicking.esm.js",
  },
  {
    ...defaultOptions,
    format: "cjs",
    output: "./dist/flicking.cjs.js",
  },
]);
