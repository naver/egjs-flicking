const TsconfigPathsPlugin  = require("tsconfig-paths-webpack-plugin");

module.exports = {
  "stories": [
    "../../test/e2e/**/*.vue.stories.mdx",
    "../../test/e2e/**/vue.stories.@(js|jsx|ts|tsx)"
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
    return config;
  }
}
