/**
 * Documentation context that holds all state needed for documentation generation.
 * Replaces global state and provides dependency injection.
 */

import type { ApiClass, ApiInterface, ApiItem, ApiPackage, ApiVariable } from "@microsoft/api-extractor-model";
import { ApiItemKind } from "@microsoft/api-extractor-model";
import { CanonicalReferenceParser } from "./canonical-reference-parser";

/**
 * Mapping from API kind to folder name
 */
const KIND_TO_FOLDER: Record<string, string> = {
  class: "classes",
  interface: "interfaces",
  function: "functions",
  var: "variables",
  type: "types",
  enum: "enums"
};

/**
 * Reference index for resolving API references
 */
class ReferenceIndex {
  private index = new Map<string, string>();
  private containerKindIndex = new Map<string, ApiItemKind>();

  addItem(item: ApiItem): void {
    if (!item.canonicalReference) {
      return;
    }

    const canonicalRef = item.canonicalReference.toString();
    const displayName = item.displayName;

    if (displayName) {
      this.index.set(displayName, canonicalRef);
    }

    if (item.kind === ApiItemKind.Class || item.kind === ApiItemKind.Interface) {
      const container = item as ApiClass | ApiInterface;

      for (const member of container.members) {
        if (member.displayName && member.canonicalReference) {
          const memberCanonicalRef = member.canonicalReference.toString();
          const qualifiedName = `${displayName}.${member.displayName}`;
          this.index.set(qualifiedName, memberCanonicalRef);
          this.containerKindIndex.set(memberCanonicalRef, item.kind);
        }
      }
    }
  }

  resolve(reference: string): string | undefined {
    return this.index.get(reference);
  }

  getContainerKind(canonicalRef: string): ApiItemKind | undefined {
    return this.containerKindIndex.get(canonicalRef);
  }

  getAllReferences(): Map<string, string> {
    return new Map(this.index);
  }
}

/**
 * Main context class for documentation generation.
 * Encapsulates all state and provides methods for reference resolution and link generation.
 */
export class DocumentationContext {
  private referenceIndex: ReferenceIndex;
  private _apiPackage: ApiPackage;
  protected packageName: string;
  private _siteBaseUrls: string[];
  private _docsBasePath: string;

  constructor(apiPackage: ApiPackage, packageName: string, siteBaseUrls?: string[], docsBasePath?: string) {
    this.referenceIndex = new ReferenceIndex();
    this._apiPackage = apiPackage;
    this.packageName = packageName;
    this._siteBaseUrls = (siteBaseUrls || []).map(url => (url.endsWith("/") ? url : `${url}/`));
    this._docsBasePath = docsBasePath || "";
    this.buildIndex(apiPackage);
  }

  private buildIndex(apiPackage: ApiPackage): void {
    const walkItems = (item: ApiItem): void => {
      this.referenceIndex.addItem(item);
      for (const member of item.members) {
        walkItems(member);
      }
    };

    for (const entryPoint of apiPackage.entryPoints) {
      walkItems(entryPoint);
    }
  }

  /**
   * Resolve a reference name to its canonical reference
   */
  resolveReference(reference: string): string | undefined {
    return this.referenceIndex.resolve(reference);
  }

  /**
   * Get all references in the index (for debugging)
   */
  getAllReferences(): Map<string, string> {
    return this.referenceIndex.getAllReferences();
  }

  /**
   * Parse a canonical reference into its components
   */
  protected parseCanonicalReference(canonicalReference: string): CanonicalReferenceParser {
    return new CanonicalReferenceParser(canonicalReference);
  }

  /**
   * Get the container kind for a member canonical reference
   */
  getContainerKind(canonicalReference: string): ApiItemKind | undefined {
    return this.referenceIndex.getContainerKind(canonicalReference);
  }

  /**
   * Convert canonical reference to file path (with optional anchor for members)
   */
  canonicalReferenceToPath(canonicalReference: string): string | null {
    if (!canonicalReference.startsWith(this.packageName)) {
      return null;
    }

    // Parse once instead of calling three separate methods
    const parser = this.parseCanonicalReference(canonicalReference);

    if (!parser.isValid) {
      return null;
    }

    const { kind, name, memberName } = parser;

    if (kind === "member") {
      const anchor = memberName ? `#${memberName}` : "";

      const containerKind = this.getContainerKind(canonicalReference);
      const folder = containerKind === ApiItemKind.Interface ? "interfaces" : "classes";

      return `${folder}/${name}.md${anchor}`;
    }

    const folder = this.kindToFolder(kind);
    if (!folder) {
      return null;
    }

    return `${folder}/${name}.md`;
  }

  /**
   * Map API kind to folder name.
   * Subclasses can override if needed (though the mapping is the same).
   */
  protected kindToFolder(kind: string): string | null {
    return KIND_TO_FOLDER[kind] || null;
  }

  /**
   * Extract member values from a constant (Variable) by name.
   * e.g., "ALIGN" → ["prev", "center", "next"]
   */
  getConstantValues(constantName: string): string[] {
    for (const entryPoint of this._apiPackage.entryPoints) {
      for (const member of entryPoint.members) {
        if (member.kind === ApiItemKind.Variable && member.displayName === constantName) {
          const variable = member as ApiVariable;
          const typeRange = variable.variableTypeExcerpt?.spannedTokens;
          if (!typeRange) return [];

          const typeText = typeRange.map(t => t.text).join("");
          // Parse readonly KEY: "value" patterns from the type text
          const matches = typeText.matchAll(/:\s*"([^"]+)"/g);
          return Array.from(matches, m => m[1]);
        }
      }
    }
    return [];
  }

  /**
   * Try to convert a site-internal URL to a relative docs path.
   * Returns null if the URL is not a site-internal URL.
   */
  convertSiteUrlToRelativePath(url: string, currentFilePath: string): string | null {
    for (const baseUrl of this._siteBaseUrls) {
      if (url.startsWith(baseUrl)) {
        // e.g., "https://example.com/site/docs/demos/basic/alignment"
        // → strip base → "docs/demos/basic/alignment"
        let internalPath = url.slice(baseUrl.length);

        // Strip "docs/" prefix since docs files are relative to the docs directory
        if (internalPath.startsWith("docs/")) {
          internalPath = internalPath.slice("docs/".length);
        }

        // Remove trailing slash
        if (internalPath.endsWith("/")) {
          internalPath = internalPath.slice(0, -1);
        }

        // Separate anchor from path
        let anchor = "";
        const hashIndex = internalPath.indexOf("#");
        if (hashIndex !== -1) {
          anchor = internalPath.slice(hashIndex);
          internalPath = internalPath.slice(0, hashIndex);
        }

        // Add .mdx extension if no extension present
        const pathAfterLastSlash = internalPath.slice(internalPath.lastIndexOf("/") + 1);
        if (!pathAfterLastSlash.includes(".")) {
          internalPath += ".mdx";
        }

        // Prepend docsBasePath to currentFilePath so relative resolution
        // accounts for the output directory's position within docs root
        // e.g., docsBasePath="api" makes "interfaces/X.mdx" → "api/interfaces/X.mdx"
        const fullCurrentPath = this._docsBasePath ? `${this._docsBasePath}/${currentFilePath}` : currentFilePath;

        return this.resolveRelativeLink(fullCurrentPath, internalPath) + anchor;
      }
    }

    return null;
  }

  /**
   * Create a relative link from one file to another
   */
  resolveRelativeLink(from: string, to: string): string {
    const fromParts = from.split("/");
    const toParts = to.split("/");

    fromParts.pop(); // Remove filename

    if (fromParts.length === 0) {
      return to;
    }

    // Find common prefix length
    let commonLength = 0;
    while (
      commonLength < fromParts.length &&
      commonLength < toParts.length - 1 && // -1 to exclude filename from comparison
      fromParts[commonLength] === toParts[commonLength]
    ) {
      commonLength++;
    }

    const upCount = fromParts.length - commonLength;
    const remainingPath = toParts.slice(commonLength).join("/");

    if (upCount === 0) {
      return remainingPath;
    }

    return "../".repeat(upCount) + remainingPath;
  }
}
