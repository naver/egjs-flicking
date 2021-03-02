const path = require("path");

module.exports = {
  // For development
  chainWebpack: config => {
    config.resolve.alias.set("~", path.resolve(__dirname, "../../src"));
  }
};
