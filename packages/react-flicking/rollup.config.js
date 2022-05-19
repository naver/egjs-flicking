const buildHelper = require("@egjs/build-helper");

const defaultOptions = {
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
};
export default buildHelper([
  {
    ...defaultOptions,
    input: "./src/react-flicking/index.ts",
    format: "esm",
    output: "./dist/flicking.esm.js",
    exports: "named"
  },
  {
    ...defaultOptions,
    input: "./src/react-flicking/index.umd.ts",
    format: "cjs",
    output: "./dist/flicking.cjs.js"
  },
  {
    ...defaultOptions,
    name: "ReactFlicking",
    input: "./src/react-flicking/index.umd.ts",
    format: "umd",
    output: "./dist/flicking.umd.js",
    external: {
      "react": "React",
      "react-dom": "ReactDOM",
      "@egjs/flicking": "Flicking",
      "@egjs/component": "Component",
      "@egjs/list-differ": "eg.ListDiffer"
    }
  }
]);
