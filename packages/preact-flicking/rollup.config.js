import builder from "@egjs/build-helper";
const preact = require("rollup-plugin-preact");


const defaultOptions = {
    sourcemap: false,
    tsconfig: "tsconfig.build.json",
    external: {
        "preact": "preact",
        "preact/compat": "preact/compat",
        "@egjs/flicking": "@egjs/flicking",
        "@egjs/list-differ": "@egjs/list-differ",
        "@egjs/children-differ": "@egjs/children-differ",
    },
    exports: "named",
    plugins: [
        preact({
            noPropTypes: false,
            noEnv: false,
            noReactIs: false,
            usePreactX: true,
        }),
    ],
};

export default builder([
    {
        ...defaultOptions,
        input: "src/preact-flicking/index.umd.ts",
        output: "./dist/flicking.esm.js",
        format: "es",
        exports: "default",
    },
    {
        ...defaultOptions,
        input: "src/preact-flicking/index.umd.ts",
        output: "./dist/flicking.cjs.js",
        format: "cjs",
        exports: "default",
    },
]);
