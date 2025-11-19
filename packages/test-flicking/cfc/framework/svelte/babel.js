const babelJest = require("babel-jest");

module.exports = babelJest.default.createTransformer({
  presets: [
    ["@babel/preset-env", {"targets": {"node": "current"}}]
  ],
  babelrc: false,
  configFile: false
})
