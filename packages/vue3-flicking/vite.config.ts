import { createViteConfig } from "../../config/vite-build-helper";
// @ts-expect-error: resolveJsonModule issue in build environment
import pkg from "./package.json";

const name = "VueFlicking";
const external = {
  vue: "Vue",
  "vue-class-component": "VueClassComponent",
  "@egjs/flicking": "Flicking",
  "@egjs/list-differ": "eg.ListDiffer",
  "@egjs/axes": "eg.Axes",
  "@egjs/component": "eg.Component"
};

// Determine build target based on environment variable
// usage: VITE_BUILD_FORMAT=cjs vite build
const buildFormat = process.env.VITE_BUILD_FORMAT || "esm";

let input = "src/index.ts";
let formats: any[] = ["es"];

if (buildFormat === "cjs") {
  input = "src/index.umd.ts";
  formats = ["cjs"];
}

export default createViteConfig({
  input,
  name,
  packageJson: pkg,
  external,
  formats,
  output: "dist/flicking"
});
