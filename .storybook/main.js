const TsconfigPathsPlugin  = require("tsconfig-paths-webpack-plugin");

module.exports = {
  "stories": [
    "../test/e2e/**/*.stories.mdx"
  ],
  refs: {
    html: {
      title: "HTML",
      url: "http://localhost:9005",
    },
    react: {
      title: "React",
      url: "http://localhost:9006",
    },
    vue: {
      title: "Vue",
      url: "http://localhost:9007",
    },
    ngx: {
      title: "Angular",
      url: "http://localhost:9008",
    }
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
