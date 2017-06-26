var merge = require("webpack-merge");
var webpack = require("webpack");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var uglifyConfig = require("./uglify");
var banner = require("./banner");

var config = {
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

module.exports = function (common) {
	return merge.strategy({
		entry: "replace",
		externals: "replace",
		plugins: "append"
	})(common, config);
};
