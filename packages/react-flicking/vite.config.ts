import { createViteConfig } from "../../config/vite-build-helper";
// @ts-expect-error: resolveJsonModule issue in build environment
import pkg from "./package.json";

const name = "ReactFlicking";
const external = {
  react: "React",
  "react-dom": "ReactDOM",
  "@egjs/flicking": "Flicking",
  "@egjs/component": "Component",
  "@egjs/list-differ": "eg.ListDiffer"
};

// Determine build target based on environment variable
// usage: VITE_BUILD_FORMAT=umd vite build
const buildFormat = process.env.VITE_BUILD_FORMAT || "esm";

// Keep the automatic JSX runtime imports (react/jsx-runtime) external so the
// consumer's own React provides them. Bundling a stale copy breaks React 19,
// whose internals (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) were
// removed. UMD has no jsx-runtime global and React 19 ships no UMD build, so we
// keep it bundled there only.
if (buildFormat !== "umd") {
  external["react/jsx-runtime"] = "react/jsx-runtime";
  external["react/jsx-dev-runtime"] = "react/jsx-dev-runtime";
}

let input = "src/react-flicking/index.ts";
let formats: any[] = ["es"];

if (buildFormat === "cjs") {
  input = "src/react-flicking/index.umd.ts";
  formats = ["cjs"];
} else if (buildFormat === "umd") {
  input = "src/react-flicking/index.umd.ts";
  formats = ["umd"];
}
// Default (esm) uses index.ts

export default createViteConfig({
  input,
  name,
  packageJson: pkg,
  external,
  formats,
  tsconfig: "tsconfig.build.json", // Use build specific tsconfig
  output: "dist/flicking" // Base name for output files
});
