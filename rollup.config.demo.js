/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const buildHelper = require("./config/build-helper");

export default buildHelper([
  {
    name: "Flicking",
    input: "./src/index.umd.ts",
    output: "./demo/release/latest/dist/flicking.pkgd.js",
    format: "umd",
    resolve: true,
    plugins: [
      serve({
        open: true,
        contentBase: "demo"
      }),
      livereload(".")
    ]
  }
]);

