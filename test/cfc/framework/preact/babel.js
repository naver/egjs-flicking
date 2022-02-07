const babelJest = require("babel-jest");

module.exports = babelJest.default.createTransformer({
  presets: [
    [
      "@babel/preset-typescript",
      {
        jsxPragma: "h",
        jsxPragmaFrag: "React.Fragment"
      }
    ],
    ["@babel/preset-env", { loose: true }]
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "h",
        pragmaFrag: "React.Fragment"
      }
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ],
  babelrc: false,
  configFile: false
})
