/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */

module.exports = config => {
  const karmaConfig = {
    frameworks: ["mocha", "chai", "sinon", "karma-typescript", "viewport"],
    mime: {
      "text/x-typescript": ["ts","tsx"]
    },
    client: {
      mocha: {
        opts: "./mocha.opts"
      }
    },
    files: [
      "./node_modules/hammer-simulator/index.js",
      "./test/unit/setup.js",
      "./test/unit/hammer-simulator.run.js",
      "./css/flicking.css",
      "./src/**/*.ts",
      "./test/unit/**/*.ts"
      // {pattern: "./test/unit/images/**/*.*", watched: false, included: false, served: true}
    ],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript"],
      "test/unit/**/*.ts": ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      tsconfig: "./test/unit/tsconfig.json",
      reports: {
        html: {
          "directory": "coverage",
          "subdirectory": "./"
        },
        lcovonly: {
          "directory": "coverage",
          "filename": "lcov.info",
          "subdirectory": "."
        }
      },
      coverageOptions: {
        instrumentation: true,
        exclude: /test/i
      }
    },
    browsers: [],
    customLaunchers: {
      CustomChromeHeadless: {
        base: "ChromeHeadless",
        flags: ["--window-size=400,300", "--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    reporters: ["mocha"]
    // proxies: {
    //   "/images/": "/base/test/unit/images/"
    // }
  };

  karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

  if (config.coverage) {
    karmaConfig.reporters.push("karma-typescript");
    karmaConfig.singleRun = true;
  }

  config.set(karmaConfig);
};
