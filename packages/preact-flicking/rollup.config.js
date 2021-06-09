import builder from "@egjs/build-helper";

const preact = require("rollup-plugin-preact");

const defaultOptions = {
    sourcemap: false,
    tsconfig: "tsconfig.build.json",
    external: {
      "preact": "preact",
      "preact/compat": "preact/compat"
    },
    plugins: [
      preact({
        extensions: ["js", "jsx", "ts", "tsx"],
        noPropTypes: false,
        noEnv: false,
        noReactIs: false,
        resolvePreactCompat: true,
        usePreactX: true,
        aliasModules: {
          'react-dom': 'preact/compat',
          'react-is': 'preact/compat'
        }
      })
    ]
};

export default builder([
    {
        ...defaultOptions,
        input: "src/preact-flicking/index.ts",
        output: "./dist/flicking.esm.js",
        format: "esm",
        exports: "named"
    },
    {
        ...defaultOptions,
        input: "src/preact-flicking/index.umd.ts",
        output: "./dist/flicking.cjs.js",
        format: "cjs"
    }
]);
