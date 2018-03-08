const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");

const config = {
	devtool: "inline-source-map",
	devServer: {
		publicPath: "/dist/"
	},
	plugins: [new WriteFilePlugin()]
};

module.exports = common => merge(common, config);
