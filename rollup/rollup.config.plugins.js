module.exports = [
	{
		input: `src/plugin/effects/plugins.js`,
		external: ["@egjs/flicking"],
		output: {
			format: "es",
			exports: "named",
			file: `./packages/flicking-plugins/dist/plugins.esm.js`
		}
	},
	{
		input: `src/plugin/effects/plugins.js`,
		external: ["@egjs/flicking"],
		output: {
			globals: {
				"@egjs/flicking": "eg.Flicking"
			},
			format: "cjs",
			exports: "named",
			file: `./packages/flicking-plugins/dist/plugins.js`
		}
	}
];
