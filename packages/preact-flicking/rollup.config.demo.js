import builder from "@egjs/build-helper";
import css from "rollup-plugin-css-bundle";
import commonjs from 'rollup-plugin-commonjs';

const preact = require("rollup-plugin-preact");


export default builder({
    input: "./src/demo/index.tsx",
    tsconfig: "./tsconfig.build.json",
    sourcemap: false,
    format: "umd",
    output: "./demo/dist/index.js",
    name: "app",
    exports: "named",
    plugins: [
        commonjs({
          namedExports: {
            'highlight.js': ['initHighlighting']
          }
        }),
        css({ output: "./demo/dist/index.css" }),
        preact({
            noPropTypes: true,
            noEnv: true,
            noReactIs: true,
            resolvePreactCompat: true,
            usePreactX: true
        })
    ]
});
