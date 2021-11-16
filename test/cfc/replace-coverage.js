const path = require("path");
const lcovPath = path.resolve(__dirname, "./coverage/lcov.info");

const replace = require("replace-in-file");

const alias = {
  "@egjs/flicking": "src",
  "@egjs/react-flicking": "packages/react-flicking/src/react-flicking",
  "@egjs/preact-flicking": "packages/preact-flicking/src/preact-flicking",
  "@egjs/vue-flicking": "packages/vue-flicking/src",
  "@egjs/vue3-flicking": "packages/vue3-flicking/src",
  "@egjs/ngx-flicking": "packages/ngx-flicking/projects/ngx-flicking/src",
  "@egjs/svelte-flicking": "packages/svelte-flicking/src"
}

replace.sync({
  files: lcovPath,
  from: /framework\/.+\/lib\/@egjs\/(.+)\/(.+)/g,
  to: match => {
    const regexRes = /framework\/.+\/lib\/(?:(@egjs\/.*flicking)\/)(.+)/.exec(match);
    const package = regexRes[1];
    const file = regexRes[2];
    const actualPath = path.join(alias[package], file);

    return actualPath;
  }
});
