const path = require("path");

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
      "./node_modules/hammer-simulator/index.js",
      "./setup.ts",
      "./hammer-simulator.run.js",
      "../../css/flicking.css",
      "../../src/**/*.ts",
      "../../packages/react-flicking/src/!(demo)/**/*.+(ts|tsx)",
      "../../packages/vue-flicking/src/**/*.ts",
      "./!(node_modules|NgxFlickingWebComponent)/**/*.+(ts|tsx)"
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
        flags: ["--window-size=1280,720", "--no-sandbox", "--disable-setuid-sandbox"]
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
