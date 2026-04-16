/**
 * Docusaurus documentation generator
 *
 * Generates MDX files with frontmatter and sidebars-api.js
 * for Docusaurus integration.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { ApiInterface, ApiItem } from "@microsoft/api-extractor-model";
import { createDefaultRegistry } from "../../core/default-registry";
import type { GeneratorRegistry } from "../../core/generator-registry";
import {
  createEmptyStats,
  ensureOutputDirectories,
  type GenerationStats,
  KIND_TO_STATS_KEY,
  loadApiPackage,
  mergeStats,
  printStats
} from "../../utils/api-loader";
import { getDisplayName, isApiInterface } from "../../utils/type-guard/api-extractor";
import { DocusaurusDocumentationContext } from "./documentation-context";
import { addFrontmatter } from "./frontmatter";
import { type GeneratedFile, generateSidebarFile } from "./sidebar";

export interface DocusaurusGeneratorOptions {
  apiJsonPaths: string[];
  outputDir: string;
  sidebarOutputPath: string;
  /** Map of className → interfaceName for options to inline into class pages */
  inlineOptionsMap?: Record<string, string>;
  /** Site base URLs to convert absolute links to relative paths (e.g., ["https://naver.github.io/egjs-flicking/"]) */
  siteBaseUrls?: string[];
  /** The output directory's path relative to the docs root (e.g., "api" if output is docs/api/) */
  docsBasePath?: string;
}

/**
 * Generate Docusaurus-compatible documentation using registry pattern
 */
export function generateDocusaurusDocs(options: DocusaurusGeneratorOptions): void {
  const { apiJsonPaths, outputDir, sidebarOutputPath, inlineOptionsMap, siteBaseUrls, docsBasePath } = options;

  // Create registry with .mdx extension for Docusaurus
  const registry = createDefaultRegistry(".mdx");

  // Create output directories using shared utility
  ensureOutputDirectories(outputDir, registry.getDirectories());

  // Track generated files for sidebar (accumulated across all packages)
  const generatedFiles: GeneratedFile[] = [];

  const totalStats = createEmptyStats();

  for (const apiJsonPath of apiJsonPaths) {
    // Load API model using shared utility
    console.log(`\nLoading API model from: ${apiJsonPath}`);
    const { apiPackage, entryPoint } = loadApiPackage(apiJsonPath);

    console.log(`Found ${entryPoint.members.length} API members`);

    // Create documentation context (Docusaurus-specific for correct link paths)
    console.log("Building documentation context...");
    const packageName = `${apiPackage.name}!`;
    const ctx = new DocusaurusDocumentationContext(
      apiPackage,
      packageName,
      inlineOptionsMap,
      siteBaseUrls,
      docsBasePath
    );

    // Generate docs for each member using registry
    const stats = generateMembers(entryPoint.members, outputDir, ctx, registry, generatedFiles);

    // Accumulate stats
    mergeStats(totalStats, stats);
  }

  // Generate sidebar file (once, with all files from all packages)
  const sidebarContent = generateSidebarFile(generatedFiles);
  fs.writeFileSync(sidebarOutputPath, sidebarContent, "utf-8");
  console.log(`Generated sidebar: ${sidebarOutputPath}`);

  // Print stats using shared utility
  printStats(totalStats, outputDir);
}

/**
 * Generate documentation for all members using the registry
 */
function generateMembers(
  members: readonly ApiItem[],
  outputDir: string,
  ctx: DocusaurusDocumentationContext,
  registry: GeneratorRegistry,
  generatedFiles: GeneratedFile[]
): GenerationStats {
  const stats = createEmptyStats();

  // Build a map of className → ApiInterface for inlined options
  const inlineOptionsInterfaces = new Map<string, ApiInterface>();
  for (const member of members) {
    const name = getDisplayName(member);
    if (ctx.isInlinedInterface(name) && isApiInterface(member)) {
      const className = ctx.getClassForInlinedInterface(name)!;
      inlineOptionsInterfaces.set(className, member);
    }
  }

  for (const member of members) {
    const displayName = getDisplayName(member);

    // Skip interfaces that are inlined into class pages
    if (ctx.isInlinedInterface(displayName)) {
      console.log(`Inlining ${displayName} into class page`);
      continue;
    }

    try {
      const filePath = registry.buildFilePath(member.kind, displayName);

      if (!filePath) {
        stats.skipped++;
        console.log(`Skipping ${member.kind}: ${displayName}`);
        continue;
      }

      const result = registry.generateFor(member, {
        currentFilePath: filePath,
        documentationContext: ctx,
        inlineOptionsInterfaces
      });

      if (result) {
        // Get category from file path
        const pathParts = result.filePath.split("/");
        const category = (pathParts[0] || "classes") as GeneratedFile["category"];

        const fullPath = path.join(outputDir, result.filePath);

        // Add frontmatter to content
        const mdxContent = addFrontmatter(result.content, {
          title: displayName,
          sidebarLabel: displayName
        });

        fs.writeFileSync(fullPath, mdxContent, "utf-8");
        console.log(`Generated: ${result.filePath}`);

        // Track for sidebar
        generatedFiles.push({ name: displayName, category });

        const statsKey = KIND_TO_STATS_KEY[member.kind];
        if (statsKey) {
          stats[statsKey]++;
        }
      } else {
        stats.skipped++;
      }
    } catch (error) {
      console.error(`Error generating docs for ${displayName}:`, error);
      stats.skipped++;
    }
  }

  return stats;
}
