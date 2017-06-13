var pkg = require("../package.json");
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
	entry: {
		"flicking": "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: ["eg", "Flicking"],
		libraryTarget: "umd"
	},
	externals: [{
		"@egjs/component": {
			commonjs: "@egjs/component",
			commonjs2: "@egjs/component",
			amd: "@egjs/component",
			root: [pkg.namespace.eg, "Component"]
		},
		"@egjs/movablecoord": {
			commonjs: "@egjs/movablecoord",
			commonjs2: "@egjs/movablecoord",
			amd: "@egjs/movablecoord",
			root: [pkg.namespace.eg, "MovableCoord"]
		}
	}],
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /(\.js)$/,
				exclude: /(node_modules)/,
				loader: "babel",
				options: {
					"presets": [
						[
							"es2015",
							{
								"loose": true,
								"modules": false
							}
						]
					]
				}
			},
			{
				test: /(\.js)$/,
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /#__VERSION__#/ig,
							replacement: function (match, p1, offset, string) {
								return pkg.version;
							}
						}
					]}
				)
            }
		]
	},
	plugins: [
		new StringReplacePlugin()
	],
	resolveLoader: {
		moduleExtensions: ["-loader"]
	}
};
