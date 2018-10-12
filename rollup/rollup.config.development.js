const merge = require("./merge");
const uglify = require("./uglify");

const defaultConfig = {
	external: ["@egjs/axes", "@egjs/component"],
	output: {
		globals: {
			"@egjs/axes": "eg.Axes",
			"@egjs/component": "eg.Component"
		}
	}
};

module.exports = merge(defaultConfig, [
	{
		output: {
			file: "./dist/flicking.js"
		}
	},
	{
		plugins: [uglify],
		output: {
			file: "./dist/flicking.min.js"
		}
	}
]);
