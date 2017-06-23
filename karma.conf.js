const webpackConfig = require("./config/webpack");

module.exports = function(config) {
	var karmaConfig = {
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],

		// list of files / patterns to load in the browser
		files: [
			"./node_modules/phantomjs-polyfill/bind-polyfill.js",
			"./node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js",
			"./node_modules/lite-fixture/index.js",
			"./node_modules/hammer-simulator/index.js",
			"./test/hammer-simulator.run.js",
			"./test/unit/assets/*.css",
			"./test/**/*.spec.js"
		],

		client: {
			mocha: {
				opts: "./mocha.opts"
			}
		},

		// list of files to exclude
		exclude: [],

		webpack: {
			devtool: webpackConfig.module.devtool,
			module: {
				rules: [webpackConfig.module.rules[0]]
			}
		},

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			"./test/**/*.spec.js": config.coverage ? ["webpack"] : ["webpack", "sourcemap"]
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ["mocha"],

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [],

		webpackMiddleware: {
			noInfo: true
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		webpackServer: {
			noInfo: true
		},

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		captureTimeout: 60000
	};

	karmaConfig.browsers.push(config.chrome ? "Chrome" : "PhantomJS");

	if(config.coverage) {
		karmaConfig.reporters.push('coverage-istanbul');

		karmaConfig.coverageIstanbulReporter = {
			reports: ["text-summary", "html"],
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
