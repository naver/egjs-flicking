#!/usr/bin/env node

/**
 * Build verification test for @egjs/flicking-plugins
 * Tests that the built files have correct exports and structure
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧪 Testing @egjs/flicking-plugins build outputs...\n");

// Test 1: Check that all expected files exist
console.log("1️⃣ Checking file existence...");
const expectedFiles = [
  "dist/plugins.esm.js",
  "dist/plugins.cjs.js",
  "dist/plugins.js",
  "dist/plugins.min.js",
  "dist/arrow.css",
  "dist/arrow.min.css",
  "dist/pagination.css",
  "dist/pagination.min.css",
  "dist/flicking-plugins.css",
  "dist/flicking-plugins.min.css"
];

let allFilesExist = true;
for (const file of expectedFiles) {
  try {
    readFileSync(join(__dirname, file));
    console.log(`  ✅ ${file}`);
  } catch (_e) {
    console.log(`  ❌ ${file} - NOT FOUND`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error("\n❌ Some files are missing!");
  process.exit(1);
}

// Test 2: Check UMD export structure
console.log("\n2️⃣ Checking UMD (plugins.js) exports...");
const umdContent = readFileSync(join(__dirname, "dist/plugins.js"), "utf8");

const umdChecks = [
  { name: "Has Flicking.Plugins global", check: umdContent.includes("Flicking.Plugins") },
  { name: "Exports Arrow", check: umdContent.includes("Arrow") },
  { name: "Exports AutoPlay", check: umdContent.includes("AutoPlay") },
  { name: "Exports Fade", check: umdContent.includes("Fade") },
  { name: "Exports Parallax", check: umdContent.includes("Parallax") },
  { name: "Exports Perspective", check: umdContent.includes("Perspective") },
  { name: "Exports Sync", check: umdContent.includes("Sync") },
  { name: "Exports Pagination", check: umdContent.includes("Pagination") },
  { name: "Has UMD wrapper", check: umdContent.includes("typeof define") && umdContent.includes("typeof exports") }
];

let umdPassed = true;
for (const { name, check } of umdChecks) {
  if (check) {
    console.log(`  ✅ ${name}`);
  } else {
    console.log(`  ❌ ${name}`);
    umdPassed = false;
  }
}

// Test 3: Check ESM export structure
console.log("\n3️⃣ Checking ESM (plugins.esm.js) exports...");
const esmContent = readFileSync(join(__dirname, "dist/plugins.esm.js"), "utf8");

const esmChecks = [
  { name: "Has export statement", check: esmContent.includes("export {") },
  { name: "Exports Arrow", check: /export\s*\{[^}]*Arrow[^}]*\}/.test(esmContent) },
  { name: "Exports AutoPlay", check: /export\s*\{[^}]*AutoPlay[^}]*\}/.test(esmContent) },
  { name: "Exports Pagination", check: /export\s*\{[^}]*Pagination[^}]*\}/.test(esmContent) },
  { name: "Imports from @egjs/flicking", check: esmContent.includes('from "@egjs/flicking"') }
];

let esmPassed = true;
for (const { name, check } of esmChecks) {
  if (check) {
    console.log(`  ✅ ${name}`);
  } else {
    console.log(`  ❌ ${name}`);
    esmPassed = false;
  }
}

// Test 4: Check minified file sizes are reasonable
console.log("\n4️⃣ Checking minified file sizes...");
const stats = {
  "plugins.js": readFileSync(join(__dirname, "dist/plugins.js")).length,
  "plugins.min.js": readFileSync(join(__dirname, "dist/plugins.min.js")).length,
  "flicking-plugins.css": readFileSync(join(__dirname, "dist/flicking-plugins.css")).length,
  "flicking-plugins.min.css": readFileSync(join(__dirname, "dist/flicking-plugins.min.css")).length
};

const minJsRatio = stats["plugins.min.js"] / stats["plugins.js"];
const minCssRatio = stats["flicking-plugins.min.css"] / stats["flicking-plugins.css"];

console.log(`  plugins.js: ${(stats["plugins.js"] / 1024).toFixed(2)} KB`);
console.log(`  plugins.min.js: ${(stats["plugins.min.js"] / 1024).toFixed(2)} KB`);
console.log(`  ✅ JS minification ratio: ${(minJsRatio * 100).toFixed(1)}%`);

console.log(`  flicking-plugins.css: ${(stats["flicking-plugins.css"] / 1024).toFixed(2)} KB`);
console.log(`  flicking-plugins.min.css: ${(stats["flicking-plugins.min.css"] / 1024).toFixed(2)} KB`);
console.log(`  ✅ CSS minification ratio: ${(minCssRatio * 100).toFixed(1)}%`);

// Test 5: Check for sourcemaps
console.log("\n5️⃣ Checking sourcemaps...");
const hasEsmMap = esmContent.includes("sourceMappingURL");
const hasUmdMap = umdContent.includes("sourceMappingURL");
const minJsContent = readFileSync(join(__dirname, "dist/plugins.min.js"), "utf8");
const hasMinJsMap = minJsContent.includes("sourceMappingURL");

console.log(`  ✅ ESM has sourcemap: ${hasEsmMap}`);
console.log(`  ✅ UMD has sourcemap: ${hasUmdMap}`);
console.log(`  ✅ Minified JS has sourcemap: ${hasMinJsMap}`);

// Check that minified CSS doesn't have inline sourcemap
const minCssContent = readFileSync(join(__dirname, "dist/flicking-plugins.min.css"), "utf8");
const hasInlineSourcemap = minCssContent.includes("sourceMappingURL=data:application/json");
if (hasInlineSourcemap) {
  console.log(`  ❌ Minified CSS has inline sourcemap (should be removed)`);
} else {
  console.log(`  ✅ Minified CSS has no inline sourcemap`);
}

// Final result
console.log(`\n${"=".repeat(50)}`);
if (allFilesExist && umdPassed && esmPassed && !hasInlineSourcemap) {
  console.log("✅ All tests passed! Build is verified.");
  process.exit(0);
} else {
  console.log("❌ Some tests failed. Please check the output above.");
  process.exit(1);
}
