const fs = require("fs");
const pkg = require("../package.json");

let copyright = `Copyright (c) ${pkg.author ? pkg.author.name || pkg.author : ""}`;
try {
  const licenseFile = fs.readFileSync(process.cwd() + "/LICENSE", { encoding: "utf8" });
  const result = licenseFile.match(/^copy.*$/img);

  if (result && result[0]) {
    copyright = result[0];
  }

} catch (e) { }
const defaultBanner = `/*
${copyright}
name: ${pkg.name}
license: ${pkg.license}
author: ${pkg.author ? pkg.author.name || pkg.author : ""}
repository: ${pkg.repository.url}
version: ${pkg.version}
*/`;
const commonjsPlugin = require("@rollup/plugin-commonjs")();
const typescriptPlugin = require("rollup-plugin-typescript2");
const minifyPlugin = require("rollup-plugin-prototype-minify")({ sourcemap: true })
const resolvePlugin = require("@rollup/plugin-node-resolve")();
const uglifyPlugin = require("rollup-plugin-uglify").uglify;
const visualizerPlugin = require("rollup-plugin-visualizer");

module.exports = function config(options) {
  if (Array.isArray(options)) {
    return options.map(options2 => config(options2)).reduce((prev, cur) => prev.concat(cur), []);
  }
  if (Array.isArray(options.output)) {
    return options.output.map(file => config({
      ...options,
      output: file,
    }));
  }
  const {
    input,
    output, // string | string[]
    tsconfig = "tsconfig.json",
    format = "umd", // "umd", "cjs", "es"
    exports = "default", // "default", "named"
    sourcemap = true, // boolean,
    plugins = [],
    name, // string,
    uglify, // boolean or except string
    resolve, // boolean
    commonjs, // boolean,
    visualizer, //  options
    external, // {object}
    inputOptions, // other input options
    outputOptions, // other output options
    banner = defaultBanner,
  } = options;
  const replacePlugin = require("@rollup/plugin-replace")({
    "#__VERSION__#": pkg.version,
    "#__FILETYPE__#": format,
    "/** @class */": "/*#__PURE__*/",
    delimiters: ["", ""],
    sourcemap: true,
  });
  const nextPlugins = plugins.concat([
    typescriptPlugin({
      tsconfig,
      "sourceMap": true,
    }),
    minifyPlugin,
    replacePlugin
  ]);

  commonjs && nextPlugins.push(commonjsPlugin);
  resolve && nextPlugins.push(resolvePlugin);
  if (uglify) {
    const condition = typeof uglify === "string" ? uglify : `name:(\\s*)${pkg.name.replace(/\//g, "\\/")}`;
    const uglifyFunction = eval(`(function () {
      return function (node, comment) {
        var text = comment.value;
        var type = comment.type;
        if (type === "comment2") {
        // multiline comment
          return /${condition}/g.test(text);
        }
      }
      })();`);
    nextPlugins.push(uglifyPlugin({
      sourcemap: true,
      output: {
        comments: uglifyFunction,
      },
    }));
  }
  visualizer && nextPlugins.push(visualizerPlugin({
    sourcemap: true,
    filename: './statistics/index.html',
    title: '',
    ...visualizer,
  }));

  return {
    input,
    plugins: nextPlugins,
    external: Object.keys(external || {}),
    ...inputOptions,
    output: {
      banner,
      format: "es",
      freeze: false,
      esModule: false,
      interop: false,
      globals: external,
      format,
      name,
      exports,
      file: output,
      sourcemap,
      ...outputOptions,
    },
  };
}
