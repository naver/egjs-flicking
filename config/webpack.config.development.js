const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");

const config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/"
	},
	plugins: [new WriteFilePlugin()]
};

module.exports = common => {
	// A temporary solution. It'll be solved in the next webpack release.
	// https://github.com/webpack/webpack/pull/6641
	common.output.library = common.output.library[1];

	return merge(common, config);
};

