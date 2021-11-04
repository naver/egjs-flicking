/* eslint-disable prefer-arrow/prefer-arrow-functions */
const svelte = require("svelte/compiler");
const path = require("path")
const assign = require("object-assign")

const createSveltePreprocessor = (args, config, logger, helper) => {
  config = config || {};

  const log = logger.create("preprocessor.svelte");
  const defaultOptions = {
    bare: true,
    sourceMap: false
  };
  const options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  const transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.svelte$/, ".js");
  };

  return function(content, file, done) {
    let result = null;

    console.log("processing", file.originalPath);
    log.info(`Processing ${file.originalPath}.`);
    file.path = transformPath(file.originalPath);

    // Clone the options because coffee.compile mutates them
    const opts = assign({}, options);

    try {
      result = svelte.compile(content, { format: "cjs" });
    } catch (e) {
      log.error("%s\n  at %s:%d", e.message, file.originalPath, e.location.first_line);
      return done(e, null);
    }

    const map = result.js.map;
    const datauri = "data:application/json;charset=utf-8;base64," + new Buffer(JSON.stringify(map)).toString("base64");
    file.sourceMap = map;

    done(null, result.js.code + "\n//# sourceMappingURL=" + datauri + "\n");
  };
}

createSveltePreprocessor.$inject = ["args", "config.coffeePreprocessor", "logger", "helper"]

// PUBLISH DI MODULE
module.exports = {
  "preprocessor:svelte": ["factory", createSveltePreprocessor]
}
