const webpack = require("webpack");
const pkg = require("./package.json");
const path = require("path");
const StringReplacePlugin = require("string-replace-webpack-plugin");
const Stylish = require("webpack-stylish");

const config = {
	entry: {
		"flicking": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		library: [pkg.namespace.eg, "Flicking"],
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	externals: [
		{
			"@egjs/component": {
				commonjs: "@egjs/component",
				commonjs2: "@egjs/component",
				amd: "@egjs/component",
				root: [pkg.namespace.eg, "Component"]
			},
			"@egjs/axes": {
				commonjs: "@egjs/axes",
				commonjs2: "@egjs/axes",
				amd: "@egjs/axes",
				root: [pkg.namespace.eg, "Axes"]
			}
		}
	],
	mode: "none",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
			},
			{
				test: /\.js$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: (match, p1, offset, string) => pkg.version
						}
					]
				})
			}
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new StringReplacePlugin(),
		new Stylish()
	],
	stats: "minimal"
};

module.exports = env => {
	const mode = (env && env.mode) || "development";

	return require(`./config/webpack.config.${mode}.js`)(config);
};
