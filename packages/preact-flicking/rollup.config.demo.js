const css = require("rollup-plugin-css-only");
const buildHelper = require("@egjs/build-helper");

export default buildHelper({
  input: "./src/demo/index.tsx",
  tsconfig: "./tsconfig.build.json",
  sourcemap: true,
  resolve: true,
  format: "umd",
  output: "./demo/dist/index.js",
  name: "app",
  exports: "named",
  plugins: [css({output: "./demo/dist/index.css"})],
  commonjs: true,
});
