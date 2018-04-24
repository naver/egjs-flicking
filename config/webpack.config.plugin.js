const merge = require("webpack-merge");
const webpack = require("webpack");
const pkg = require("../package.json");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const uglifyConfig = require("./uglify");
const banner = require("./banner");

const distPath = "../dist/plugin";
const config = {
	entry: {
		"ParallaxEffect": "./src/plugin/effects/ParallaxEffect.js",
		"OpacityEffect": "./src/plugin/effects/OpacityEffect.js"
	},
	output: {
		path: path.resolve(__dirname, distPath),
		filename: "[name].js",
		library: [pkg.namespace.eg, "Flicking", "plugin", "[name]"],
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	externals: [
		{
			"../Flicking.js": {
				commonjs: "@egjs/flicking",
				commonjs2: "@egjs/flicking",
				amd: "@egjs/flicking",
				root: [pkg.namespace.eg, "Flicking"]
			}
		}
	],
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
		new webpack.BannerPlugin(banner.common)
	]
};

module.exports = (common, env) => {
	if (env && env.min) {
		config.output.filename = "[name].min.js";
		config.plugins.push(new UglifyJSPlugin(uglifyConfig));
	} else {
		config.plugins.push(new CleanWebpackPlugin([path.resolve(__dirname, distPath)], {
			root: path.resolve(__dirname, "../"),
			verbose: true,
			dry: false
		}));
	}

	return merge.strategy({
		entry: "replace",
		output: "replace",
		module: "append",
		plugins: "append"
	})(common, config);
}
