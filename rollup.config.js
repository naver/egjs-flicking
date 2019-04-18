
// flicking.js
// flicking.min.js
// flicking.pkgd.js
// flicking.pkgd.min.js
// flicking.esm.js


const {esm, umds} = require("./config/bundler");


export default [
	...umds({
		input: "./src/index.umd.ts",
		outputs: [
			`./dist/flicking.js`,
			`./dist/flicking.min.js`,
		],
		library: "eg.Flicking",
		externals: {
			"@egjs/axes": "eg.Axes",
			"@egjs/component": "eg.Component",
		},
	}),
	...umds({
		input: "./src/index.umd.ts",
		outputs: [
			`./dist/flicking.pkgd.js`,
			`./dist/flicking.pkgd.min.js`,
		],
		library: "eg.Flicking",
	}),
	esm({
		input: "./src/index.ts",
		output: "./dist/flicking.esm.js",
		externals: {
			"@egjs/axes": "eg.Axes",
			"@egjs/component": "eg.Component",
		},
	}),
];

