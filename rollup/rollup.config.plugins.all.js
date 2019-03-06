const uglify = require("./uglify");
const banner = require("./banner-plugins").banner;

module.exports = [
	{
		input: `src/plugin/index.js`,
		external: ["@egjs/flicking"],
		output: {
			banner,
			format: "es",
			exports: "named",
			file: `./packages/flicking-plugins/dist/plugins.esm.js`
		}
	},
	{
		input: `src/plugin/index.js`,
		external: ["@egjs/flicking"],
		output: {
			banner,
			globals: {
				"@egjs/flicking": "eg.Flicking"
			},
			name: `eg.Flicking.plugin`,
			format: "umd",
			exports: "named",
			file: `./packages/flicking-plugins/dist/all.js`
		}
	},
	{
		input: `src/plugin/index.js`,
		plugins: [uglify],
		external: ["@egjs/flicking"],
		output: {
			banner,
			globals: {
				"@egjs/flicking": "eg.Flicking"
			},
			name: `eg.Flicking.plugin`,
			format: "umd",
			exports: "named",
			file: `./packages/flicking-plugins/dist/all.min.js`
		}
	}
];
