import * as fs from "node:fs";
import * as path from "node:path";
import type { ApiItem } from "@microsoft/api-extractor-model";
import { createDefaultRegistry } from "../../core/default-registry";
import { DocumentationContext } from "../../core/documentation-context";
import { FileWriteError, formatErrorForLogging, GenerationError, isDocGeneratorError } from "../../core/errors";
import type { GeneratorRegistry } from "../../core/generator-registry";
import {
  createEmptyStats,
  ensureOutputDirectories,
  type GenerationStats,
  KIND_TO_STATS_KEY,
  loadApiPackage,
  mergeStats,
  printStats as sharedPrintStats
} from "../../utils/api-loader";
import { getDisplayName } from "../../utils/type-guard/api-extractor";

// Re-export types for backward compatibility
export type { GenerationStats };

export interface GeneratorOptions {
  apiJsonPaths: string[];
  outputDir: string;
}

/**
 * Main generator function using registry pattern
 */
export function generateDocs(options: GeneratorOptions): GenerationStats {
  const { apiJsonPaths, outputDir } = options;

  // Create registry with .md extension
  const registry = createDefaultRegistry(".md");

  // Create output directories using shared utility
  ensureOutputDirectories(outputDir, registry.getDirectories());

  const totalStats = createEmptyStats();
  const allMembers: ApiItem[] = [];

  for (const apiJsonPath of apiJsonPaths) {
    // Load API model using shared utility
    console.log(`\nLoading API model from: ${apiJsonPath}`);
    const { apiPackage, entryPoint } = loadApiPackage(apiJsonPath);

    console.log(`Found ${entryPoint.members.length} API members`);

    // Create documentation context
    console.log("Building documentation context...");
    const packageName = `${apiPackage.name}!`;
    const ctx = new DocumentationContext(apiPackage, packageName);

    // Generate docs for each member
    const stats = generateMembers(entryPoint.members, outputDir, ctx, registry);

    // Accumulate stats and members for index
    mergeStats(totalStats, stats);
    allMembers.push(...entryPoint.members);
  }

  // Generate index with all members
  generateIndex(allMembers, outputDir, registry);

  // Print stats using shared utility
  sharedPrintStats(totalStats, outputDir);

  return totalStats;
}

/**
 * Generate documentation for all members using the registry
 */
function generateMembers(
  members: readonly ApiItem[],
  outputDir: string,
  ctx: DocumentationContext,
  registry: GeneratorRegistry
): GenerationStats {
  const stats = createEmptyStats();

  for (const member of members) {
    const displayName = getDisplayName(member);

    try {
      const filePath = registry.buildFilePath(member.kind, displayName);

      if (!filePath) {
        stats.skipped++;
        console.log(`Skipping ${member.kind}: ${displayName}`);
        continue;
      }

      const result = registry.generateFor(member, {
        currentFilePath: filePath,
        documentationContext: ctx
      });

      if (result) {
        const fullPath = path.join(outputDir, result.filePath);

        try {
          fs.writeFileSync(fullPath, result.content, "utf-8");
        } catch (writeError) {
          throw new FileWriteError(fullPath, writeError instanceof Error ? writeError : undefined);
        }

        const statsKey = KIND_TO_STATS_KEY[member.kind];
        if (statsKey) {
          stats[statsKey]++;
        }
      } else {
        stats.skipped++;
      }
    } catch (error) {
      // Wrap non-DocGeneratorError in GenerationError for consistent handling
      const wrappedError = isDocGeneratorError(error)
        ? error
        : new GenerationError(displayName, member.kind, error instanceof Error ? error : undefined);

      console.error(formatErrorForLogging(wrappedError));
      stats.skipped++;
    }
  }

  return stats;
}

/**
 * Generate index page
 */
function generateIndex(members: readonly ApiItem[], outputDir: string, registry: GeneratorRegistry): void {
  const lines: string[] = [];

  lines.push("# API Documentation");
  lines.push("");
  lines.push("Auto-generated API documentation for @egjs/flicking");
  lines.push("");

  // Group by kind
  const byKind = new Map<string, ApiItem[]>();
  for (const member of members) {
    const kind = member.kind;
    if (!byKind.has(kind)) {
      byKind.set(kind, []);
    }
    byKind.get(kind)?.push(member);
  }

  // Section configuration
  const sections: { kind: string; title: string }[] = [
    { kind: "Class", title: "Classes" },
    { kind: "Interface", title: "Interfaces" },
    { kind: "Function", title: "Functions" },
    { kind: "Variable", title: "Variables & Constants" },
    { kind: "TypeAlias", title: "Types" }
  ];

  for (const section of sections) {
    if (byKind.has(section.kind)) {
      lines.push(`## ${section.title}`);
      lines.push("");
      for (const item of byKind.get(section.kind) || []) {
        const displayName = getDisplayName(item);
        const filePath = registry.buildFilePath(item.kind, displayName);
        if (filePath) {
          lines.push(`- [${displayName}](${filePath})`);
        }
      }
      lines.push("");
    }
  }

  const indexPath = path.join(outputDir, "index.md");
  fs.writeFileSync(indexPath, lines.join("\n"), "utf-8");
  console.log("Generated index.md");
}
