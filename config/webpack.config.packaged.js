const merge = require("webpack-merge");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const uglifyConfig = require("./uglify");
const banner = require("./banner");

const config = {
	entry: {
		"flicking.pkgd": "./src/index.js",
		"flicking.pkgd.min": "./src/index.js"
	},
	externals: [],
	plugins: [
		new UglifyJSPlugin(uglifyConfig),
		new webpack.BannerPlugin([banner.common, "", banner.pkgd].join("\r\n"))
	]
};

module.exports = common => {
	return merge.strategy({
		entry: "replace",
		externals: "replace",
		plugins: "append"
	})(common, config);
};
