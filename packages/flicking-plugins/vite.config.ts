import { createViteConfig } from "../../config/vite-build-helper";
// @ts-expect-error: resolveJsonModule issue in build environment
import pkg from "./package.json";

const name = "Flicking.Plugins";
const external = {
  "@egjs/flicking": "Flicking"
};

// Determine build target based on environment variable
// usage: VITE_BUILD_FORMAT=umd vite build
const buildFormat = process.env.VITE_BUILD_FORMAT || "common";

let formats: any[] = ["es"];
let minify = false;
const output = "dist/plugins";

if (buildFormat === "umd") {
  formats = ["umd"];
} else if (buildFormat === "umd-min") {
  formats = ["umd"];
  minify = true;
  // output은 "dist/plugins"로 유지 - minify=true일 때 자동으로 .min 추가됨
} else if (buildFormat === "esm") {
  formats = ["es"];
}

export default createViteConfig({
  input: "src/index.ts",
  name,
  packageJson: pkg,
  external,
  formats,
  output,
  minify
});
