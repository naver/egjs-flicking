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
			commonjs: "eg.component",
			commonjs2: "eg.component",
			amd: "eg.component",
			root: ["eg", "Component"]
		},
		"@egjs/movablecoord": {
			commonjs: "eg.movablecoord",
			commonjs2: "eg.movablecoord",
			amd: "eg.movablecoord",
			root: ["eg", "MovableCoord"]
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
	}/*,
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	}*/
};
