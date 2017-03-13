// Karma configuration
// Generated on Thu Jan 05 2017 11:21:09 GMT+0900 (KST)

module.exports = function(config) {
  var karmaConfig = {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './node_modules/lite-fixture/index.js',
      './node_modules/hammer-simulator/index.js',
      './test/hammer-simulator.run.js',
      './test/**/*.spec.js'
    ],

    client: {
      mocha: {
        opts: './mocha.opts' 
      }
    },

    // list of files to exclude
    exclude: [
    ],

    webpack: {
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /(\.js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          }
        ]
      }
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './test/**/*.spec.js': config.coverage ? ['webpack'] : ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],

    webpackServer: {
      noInfo: true
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    captureTimeout: 60000
  };

  if(config.coverage) {
    karmaConfig.reporters.push("coverage");
    karmaConfig.coverageReporter = {
        type: 'html',
        dir: 'coverage'
    };
    karmaConfig.browsers.push("PhantomJS");
    karmaConfig.webpack.module.rules.push(
      {
        test: /(\.js)$/,
        exclude: /(test|node_modules)/,
        enforce: "pre",
        loader: 'isparta-loader'
      }
    );
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    karmaConfig.singleRun = true;
  } else {
    // karmaConfig.browsers.push("PhantomJS");
    karmaConfig.browsers.push("Chrome");
    karmaConfig.singleRun = false;
  }

  config.set(karmaConfig);
}
