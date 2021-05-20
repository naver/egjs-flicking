/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import autoprefixer from "autoprefixer";

const buildHelper = require("./config/build-helper");

export default buildHelper([
  {
    name: "Flicking",
    input: "./test/manual/src/App.ts",
    output: "./test/manual/dist/app.js",
    format: "umd",
    tsconfig: "./test/manual/tsconfig.json",
    resolve: true,
    plugins: [
      postcss({
        extract: true,
        plugins: [autoprefixer]
      }),
      serve({
        open: true,
        port: 3000,
        contentBase: "test/manual"
      }),
      livereload(".")
    ]
  }
]);

