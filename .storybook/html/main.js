const TsconfigPathsPlugin  = require("tsconfig-paths-webpack-plugin");

module.exports = {
  "stories": [
    "../../test/e2e/**/*.html.stories.mdx",
    "../../test/e2e/**/html.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    check: false
  },
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({
      silent: true,
      configFile: "./test/e2e/tsconfig.json"
    }));
    // config.presets.push("@babel/preset-react");
    return config;
  }
}
