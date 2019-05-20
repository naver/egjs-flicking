const buildHelper = require("@egjs/build-helper");
const VuePlugin = require("rollup-plugin-vue");


const defaultOptions = {
  input: "./src/index.ts",
  sourcemap: true,
  plugins: [VuePlugin],
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
