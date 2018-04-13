// Karma configuration
// Generated on Thu Jan 05 2017 11:21:09 GMT+0900 (KST)

module.exports = function(config) {
	const karmaConfig = {
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ["mocha", "chai", "sinon"],

		// list of files / patterns to load in the browser
		files: ["./node_modules/lite-fixture/index.js", "./node_modules/hammer-simulator/index.js", "./test/hammer-simulator.run.js", "./test/unit/assets/*.css", "./test/**/*.spec.js"],

		client: {
			mocha: {
				opts: "./mocha.opts"
			}
		},

		webpack: {
			devtool: "inline-source-map",
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader"
					}
				]
			},
			mode: "none"
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./test/**/*.spec.js": config.coverage ? ["webpack"] : ["webpack", "sourcemap"]
		},

		browsers: [],
		colors: true,
		reporters: ["mocha"],
		webpackMiddleware: {
			logLevel: "silent"
		}
	};

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "ChromeHeadless");

	if (config.coverage) {
		karmaConfig.reporters.push("coverage-istanbul");
		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html", "lcovonly"],
			dir: "./coverage"
		};
		karmaConfig.webpack.module.rules.unshift({
			test: /\.js$/,
			exclude: /(node_modules|test)/,
			loader: "istanbul-instrumenter-loader"
		});
		karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
};

