
import buildHelper from "@egjs/build-helper";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const defaultOptions = {
	external: {
		svelte: "svelte",
    "@egjs/flicking": "Flicking",
    "@egjs/list-differ": "eg.ListDiffer",
    "@egjs/component": "Component"
	},
	plugins: [
		svelte({ preprocess: sveltePreprocess() }),
    nodeResolve({
      browser: true
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    })
	]
};

export default buildHelper([
	{
		...defaultOptions,
		input: "./src/index.umd.ts",
		output: "dist/flicking.cjs.js",
		format: "cjs",
    resolve: false
	},
	{
		...defaultOptions,
		input: "./src/index.ts",
		output: "dist/flicking.esm.js",
		format: "es",
		exports: "named",
    resolve: false
	}
]);
