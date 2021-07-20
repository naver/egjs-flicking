
import buildHelper from "@egjs/build-helper";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

const defaultOptions = {
	external: {
		svelte: "svelte",
    "@egjs/flicking": "Flicking",
    "@egjs/list-differ": "ListDiffer"
	},
	plugins: [
		svelte({ preprocess: sveltePreprocess() })
	]
};

export default buildHelper([
	{
		...defaultOptions,
		input: "./src/index.umd.ts",
		output: "dist/flicking.cjs.js",
		format: "cjs"
	},
	{
		...defaultOptions,
		input: "./src/index.ts",
		output: "dist/flicking.esm.js",
		format: "es",
		exports: "named"
	}
]);
