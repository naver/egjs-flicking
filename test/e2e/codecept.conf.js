process.env.TS_NODE_PROJECT = "./tsconfig.json";
require('ts-node/register')
const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './**/*.e2e.ts',
  output: './log',
  helpers: {
    Playwright: {
      url: 'http://localhost:6006',
      show: true,
      browser: 'chromium'
    },
    CFCHelper: {
      require: './helper/CFCHelper'
    },
    ResembleHelper : {
      require: "codeceptjs-resemblehelper",
      screenshotFolder : "./screenshots/output/",
      baseFolder: "./screenshots/base/",
      diffFolder: "./screenshots/diff/"
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
