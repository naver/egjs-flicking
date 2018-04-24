const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const plugin = require("./webpack.config.plugin")();

const config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/"
	},
	plugins: [new WriteFilePlugin()]
};

module.exports = (common, env) => {
	if (env.plugin) {
		config.entry = plugin.entry;
		config.output = plugin.output;
		config.externals = plugin.externals;
	}

	return env.plugin ? merge.strategy({
		entry: "replace",
		output: "replace"
	})(common, config) : merge(common, config);
}
