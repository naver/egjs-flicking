const TsconfigPathsPlugin  = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: [
    "../**/*.stories.mdx"
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
    vue3: {
      title: "Vue3",
      url: "http://localhost:9008",
    },
    ngx: {
      title: "Angular",
      url: "http://localhost:9009",
    },
    svelte: {
      title: "Svelte",
      url: "http://localhost:9010"
    }
  },
  webpackFinal: async (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin({
      silent: true,
      configFile: "./tsconfig.json"
    }));
    // config.presets.push("@babel/preset-react");
    return config;
  }
}
