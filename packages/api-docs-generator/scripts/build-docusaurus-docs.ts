#!/usr/bin/env tsx
/**
 * Build documentation for Docusaurus
 *
 * Usage: tsx scripts/build-docs.ts
 */

import * as path from "node:path";
import { generateDocusaurusDocs } from "../src/adapters/docusaurus/main";

const ROOT = path.resolve(__dirname, "..");

const apiJsonPaths = [
  path.join(ROOT, "api-artifacts/flicking.api.json"),
  path.join(ROOT, "api-artifacts/flicking-plugins.api.json")
];
const outputDir = path.join(ROOT, "../docs/docs/api");
const sidebarOutputPath = path.join(ROOT, "../docs/sidebars-api.js");

console.log("=== Building Docusaurus Documentation ===\n");
console.log(`API JSONs: ${apiJsonPaths.join(", ")}`);
console.log(`Output: ${outputDir}`);
console.log(`Sidebar: ${sidebarOutputPath}`);
console.log("");

generateDocusaurusDocs({
  apiJsonPaths,
  outputDir,
  sidebarOutputPath,
  inlineOptionsMap: {
    AutoPlay: "AutoPlayOptions",
    Arrow: "ArrowOptions",
    Perspective: "PerspectiveOptions",
    Sync: "SyncOptions",
    Pagination: "PaginationOptions"
  },
  siteBaseUrls: ["https://naver.github.io/egjs-flicking/"],
  docsBasePath: "api"
});
