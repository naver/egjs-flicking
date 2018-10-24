const uglify = require("./uglify");

module.exports = ["OpacityEffect", "ParallaxEffect"].map(id => (
	[
		{
			input: `plugin/effects/${id}.js`,
			external: ["@egjs/flicking"],
			output: {
				globals: {
					"@egjs/flicking": "eg.Flicking"
				},
				name: `eg.Flicking.plugin.${id}`,
				file: `./dist/plugin/${id}.js`
			}
		},
		{
			input: `plugin/effects/${id}.js`,
			plugins: [uglify],
			external: ["@egjs/flicking"],
			output: {
				globals: {
					"@egjs/flicking": "eg.Flicking"
				},
				name: `eg.Flicking.plugin.${id}`,
				file: `./dist/plugin/${id}.min.js`
			}
		}
	]
)).reduce((a, b) => a.concat(b), []);
