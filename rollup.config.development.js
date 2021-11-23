import buildHelper from "@egjs/build-helper";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const name = "eg.Flicking";

export default buildHelper([
  {
    name,
    input: "./src/index.umd.ts",
    output: "./test/manual/lib/flicking.pkgd.js",
    format: "umd",
    resolve: true,
    plugins: [
      serve({
        open: true,
        openPage: "/html/default.html",
        contentBase: "test/manual"
      }),
      livereload({
        watch: "./test/manual/lib/flicking.pkgd.js"
      }),
    ]
  }
]);

