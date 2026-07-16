import { createViteConfig } from "../../config/vite-build-helper";
// @ts-expect-error: resolveJsonModule issue in build environment
import pkg from "./package.json";

const name = "Flicking";
const external = {
  "@egjs/axes": "eg.Axes",
  "@egjs/component": "eg.Component",
  "@egjs/imready": "eg.ImReady"
};

// Determine build target based on environment variables
// usage examples:
//   - vite build (default)                                        -> flicking.esm.js (es)
//   - VITE_BUILD_FORMAT=cjs vite build                           -> flicking.cjs.js (cjs)
//   - VITE_BUILD_FORMAT=umd vite build                            -> flicking.js (umd)
//   - VITE_BUILD_FORMAT=umd VITE_MINIFY=true vite build          -> flicking.min.js (umd minified)
//   - VITE_BUILD_FORMAT=umd VITE_RESOLVE=true vite build         -> flicking.pkgd.js (umd packaged)
//   - VITE_BUILD_FORMAT=umd VITE_RESOLVE=true VITE_MINIFY=true vite build -> flicking.pkgd.min.js (umd packaged minified)

const buildFormat = process.env.VITE_BUILD_FORMAT || "esm";
const shouldMinify = process.env.VITE_MINIFY === "true";
const shouldResolve = process.env.VITE_RESOLVE === "true";

let input = "src/index.ts";
let formats: any[] = ["es"];
let buildExternal = external;
let outputSuffix = "";

if (buildFormat === "cjs") {
  // The CJS build uses a dedicated entry that re-assigns `module.exports` to
  // the Flicking class (with named exports attached), so `require(pkg)` returns
  // the class itself while `.default` / named / ESM interop keep resolving.
  // Building CJS from `src/index.ts` (ESM entry) instead drops this and breaks
  // `const F = require(pkg); new F()` in CommonJS environments (see #952).
  input = "src/index.cjs.ts";
  formats = ["cjs"];
} else if (buildFormat === "umd") {
  input = "src/index.umd.ts";
  formats = ["umd"];

  // If resolving dependencies, don't mark them as external
  if (shouldResolve) {
    buildExternal = {};
    outputSuffix = ".pkgd";
  }
}

export default createViteConfig({
  input,
  name,
  packageJson: pkg,
  external: buildExternal,
  formats,
  minify: shouldMinify,
  outputSuffix
});
