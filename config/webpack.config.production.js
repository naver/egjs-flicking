const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const uglifyConfig = require("./uglify");
const banner = require("./banner");

const config = {
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "eslint-loader",
				include: path.resolve(process.cwd(), "src"),
				exclude: /(node_modules)/,
				enforce: "pre"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([path.resolve(__dirname, "../dist")], {
			root: path.resolve(__dirname, "../"),
			verbose: true,
			dry: false
		}),
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin(banner.common)
	]
};

module.exports = common => {
	Object.keys(common.entry).forEach(v => {
		common.entry[`${v}.min`] = common.entry[v];
	});

	return merge.strategy({
		module: "append",
		plugins: "append"
	})(common, config);
}
