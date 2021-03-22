const buildHelper = require("@egjs/build-helper");
const VuePlugin = require("rollup-plugin-vue");

const defaultOptions = {
  sourcemap: true,
  plugins: [VuePlugin]
};
export default buildHelper([
  {
    ...defaultOptions,
    format: "es",
    exports: "named",
    input: "./src/index.ts",
    output: "./dist/flicking.esm.js"
  },
  {
    ...defaultOptions,
    format: "cjs",
    input: "./src/index.umd.ts",
    output: "./dist/flicking.cjs.js"
  }
]);
