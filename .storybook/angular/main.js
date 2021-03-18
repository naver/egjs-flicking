const TsconfigPathsPlugin  = require("tsconfig-paths-webpack-plugin");

module.exports = {
  "stories": [
    "../../test/e2e/**/*.ngx.stories.mdx",
    "../../test/e2e/**/ngx.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    check: false,
    reactDocgen: false
  },
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({
      silent: true,
      configFile: "./test/e2e/tsconfig.json"
    }));

    function checkUse(use) {
      if (use.loader && use.loader.includes('ts-loader') && 'configFile' in use.options && use.options.configFile === undefined)
        delete use.options.configFile;
    }
    for (let rule of config.module.rules) {
      if (rule.use)
        for (let use of rule.use)
          checkUse(use);
      else
        checkUse(rule);
    }

    return config;

    return config;
  }
}
