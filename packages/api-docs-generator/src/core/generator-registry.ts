import type { ApiInterface, ApiItem } from "@microsoft/api-extractor-model";
import { getDisplayName } from "../utils/type-guard/api-extractor";
import type { DocumentationContext } from "./documentation-context";

/**
 * Context passed to generators
 */
export interface GeneratorContext {
  currentFilePath: string;
  documentationContext: DocumentationContext;
  inlineOptionsInterfaces?: Map<string, ApiInterface>;
}

/**
 * Result of a generation operation
 */
export interface GeneratedResult {
  content: string;
  filePath: string;
  category: string;
  name: string;
}

/**
 * Custom path resolver function type
 */
export type PathResolver = (name: string, directory: string, extension: string) => string;

/**
 * Configuration for a generator
 */
export interface GeneratorConfig {
  /** The API item kind this generator handles (e.g., "Class", "Interface") */
  kind: string;
  /** Output directory for this kind */
  directory: string;
  /** File extension (e.g., ".md", ".mdx") */
  extension: string;
  /** Generate function that produces markdown content */
  generate: (member: ApiItem, context: GeneratorContext) => string;
  /** Optional custom path resolver */
  pathResolver?: PathResolver;
}

/**
 * Registry for managing documentation generators by API item kind.
 *
 * This class implements the Registry pattern to:
 * - Eliminate switch statements in main generation loops
 * - Make it easy to add new API member types
 * - Centralize generator configuration
 */
export class GeneratorRegistry {
  private generators = new Map<string, GeneratorConfig>();

  /**
   * Register a generator for a specific API item kind
   * @throws Error if a generator for the kind is already registered
   */
  register(config: GeneratorConfig): void {
    if (this.generators.has(config.kind)) {
      throw new Error(`Generator for kind '${config.kind}' is already registered`);
    }
    this.generators.set(config.kind, config);
  }

  /**
   * Get a registered generator by kind
   */
  get(kind: string): GeneratorConfig | undefined {
    return this.generators.get(kind);
  }

  /**
   * Check if a generator is registered for a kind
   */
  has(kind: string): boolean {
    return this.generators.has(kind);
  }

  /**
   * Get all registered kinds
   */
  getSupportedKinds(): string[] {
    return Array.from(this.generators.keys());
  }

  /**
   * Get all unique directories from registered generators
   */
  getDirectories(): string[] {
    const directories = new Set<string>();
    for (const config of this.generators.values()) {
      directories.add(config.directory);
    }
    return Array.from(directories);
  }

  /**
   * Build file path for a member
   */
  buildFilePath(kind: string, name: string): string | null {
    const config = this.generators.get(kind);
    if (!config) {
      return null;
    }

    if (config.pathResolver) {
      return config.pathResolver(name, config.directory, config.extension);
    }

    return `${config.directory}/${name}${config.extension}`;
  }

  /**
   * Generate documentation for an API member
   * @returns GeneratedResult if successful, null if kind is not supported
   */
  generateFor(member: ApiItem, context: GeneratorContext): GeneratedResult | null {
    const config = this.generators.get(member.kind);
    if (!config) {
      return null;
    }

    const name = getDisplayName(member);
    const filePath = this.buildFilePath(member.kind, name);

    if (!filePath) {
      return null;
    }

    const content = config.generate(member, context);

    return {
      content,
      filePath,
      category: config.directory,
      name
    };
  }
}
