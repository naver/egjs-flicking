module.exports = config => {
  const karmaConfig = {
    basePath: "",
    frameworks: [
      "mocha",
      "chai",
      "sinon",
      "karma-typescript",
      "viewport"
    ],
    mime: {
      "text/x-typescript": ["ts","tsx"]
    },
    client: {
      mocha: {
        opts: "./mocha.opts"
      }
    },
    files: [
      "./setup.ts",
      "./node_modules/hammer-simulator/index.js",
      "./hammer-simulator.run.js",
      "../../css/flicking.css",
      "../../src/**/*.ts",
      "./!(node_modules)/**/*.+(ts|tsx)"
    ],
    preprocessors: {
      "../../**/*.{ts,tsx}": ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
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
        flags: ["--window-size=640,480", "--no-sandbox", "--disable-setuid-sandbox"]
      }
    },
    reporters: ["mocha"]
  };

  karmaConfig.browsers.push(config.chrome ? "Chrome" : "CustomChromeHeadless");

  if (config.coverage) {
    karmaConfig.reporters.push("karma-typescript");
    karmaConfig.singleRun = true;
  }

  config.set(karmaConfig);
};
