process.env.TS_NODE_PROJECT = "./test/e2e/tsconfig.json";
require('ts-node/register')
const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './test/e2e/**/*.e2e.ts',
  output: './test/e2e/log',
  helpers: {
    Playwright: {
      url: 'http://localhost:6006',
      show: true,
      browser: 'chromium'
    },
    CFCHelper: {
      require: './test/e2e/helper/CFCHelper'
    },
    ResembleHelper : {
      require: "codeceptjs-resemblehelper",
      screenshotFolder : "./test/e2e/screenshots/output/",
      baseFolder: "./test/e2e/screenshots/base/",
      diffFolder: "./test/e2e/screenshots/diff/"
    }
  },
  bootstrap: null,
  mocha: {},
  name: 'egjs-flicking',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}
