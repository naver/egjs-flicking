/**
 * Shared utilities for API documentation generation.
 * These functions are used by both basic and docusaurus generators
 * to eliminate code duplication.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { ApiEntryPoint, ApiPackage } from "@microsoft/api-extractor-model";
import { ApiModel } from "@microsoft/api-extractor-model";

/**
 * Statistics for documentation generation
 */
export interface GenerationStats {
  classes: number;
  interfaces: number;
  functions: number;
  variables: number;
  types: number;
  skipped: number;
}

/**
 * Result of loading an API package
 */
export interface LoadedApiPackage {
  apiPackage: ApiPackage;
  entryPoint: ApiEntryPoint;
}

/**
 * Load an API package from a JSON file
 * @param apiJsonPath Path to the api.json file
 * @returns The loaded API package and its first entry point
 */
export function loadApiPackage(apiJsonPath: string): LoadedApiPackage {
  const apiModel = new ApiModel();
  const apiPackage = apiModel.loadPackage(apiJsonPath);
  const entryPoint = apiPackage.entryPoints[0];

  return { apiPackage, entryPoint };
}

/**
 * Ensure output directories exist
 * @param outputDir Base output directory
 * @param directories Array of subdirectory names to create
 */
export function ensureOutputDirectories(outputDir: string, directories: string[]): void {
  for (const dir of directories) {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

/**
 * Create an empty generation stats object
 */
export function createEmptyStats(): GenerationStats {
  return {
    classes: 0,
    interfaces: 0,
    functions: 0,
    variables: 0,
    types: 0,
    skipped: 0
  };
}

/**
 * Map API item kind to stats key
 */
export const KIND_TO_STATS_KEY: Record<string, keyof GenerationStats> = {
  Class: "classes",
  Interface: "interfaces",
  Function: "functions",
  Variable: "variables",
  TypeAlias: "types"
};

/**
 * Accumulate stats from source into target (mutates target)
 */
export function mergeStats(target: GenerationStats, source: GenerationStats): void {
  target.classes += source.classes;
  target.interfaces += source.interfaces;
  target.functions += source.functions;
  target.variables += source.variables;
  target.types += source.types;
  target.skipped += source.skipped;
}

/**
 * Print generation statistics to console
 * @param stats The generation statistics
 * @param outputDir The output directory path
 */
export function printStats(stats: GenerationStats, outputDir: string): void {
  console.log("\n=== Generation Complete ===");
  console.log(`Classes: ${stats.classes}`);
  console.log(`Interfaces: ${stats.interfaces}`);
  console.log(`Functions: ${stats.functions}`);
  console.log(`Variables: ${stats.variables}`);
  console.log(`Types: ${stats.types}`);
  console.log(`Skipped: ${stats.skipped}`);
  console.log(`Output directory: ${outputDir}`);
}
