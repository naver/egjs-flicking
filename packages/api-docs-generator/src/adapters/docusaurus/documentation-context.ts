/**
 * Docusaurus-specific documentation context
 *
 * Extends the base DocumentationContext for Docusaurus output format.
 */

import type { ApiPackage } from "@microsoft/api-extractor-model";
import { ApiItemKind } from "@microsoft/api-extractor-model";
import { DocumentationContext } from "../../core/documentation-context";

/**
 * Documentation context for Docusaurus output.
 */
export class DocusaurusDocumentationContext extends DocumentationContext {
  /** Reverse map: interfaceName → className for interfaces inlined into class pages */
  private _inlinedInterfaceToClass: Map<string, string>;
  /** Set of interface names that should be skipped (inlined into class pages) */
  private _inlinedInterfaceNames: Set<string>;

  constructor(
    apiPackage: ApiPackage,
    packageName: string,
    inlineOptionsMap?: Record<string, string>,
    siteBaseUrls?: string[],
    docsBasePath?: string
  ) {
    super(apiPackage, packageName, siteBaseUrls, docsBasePath);
    this._inlinedInterfaceToClass = new Map();
    this._inlinedInterfaceNames = new Set();
    if (inlineOptionsMap) {
      for (const [className, interfaceName] of Object.entries(inlineOptionsMap)) {
        this._inlinedInterfaceToClass.set(interfaceName, className);
        this._inlinedInterfaceNames.add(interfaceName);
      }
    }
  }

  /**
   * Check if an interface name is inlined into a class page
   */
  isInlinedInterface(name: string): boolean {
    return this._inlinedInterfaceNames.has(name);
  }

  /**
   * Get the class name that an inlined interface maps to
   */
  getClassForInlinedInterface(interfaceName: string): string | undefined {
    return this._inlinedInterfaceToClass.get(interfaceName);
  }

  /**
   * Convert canonical reference to file path.
   * All items are placed in category folders.
   * Member references include anchors (e.g., Flicking.mdx#addPlugins).
   */
  override canonicalReferenceToPath(canonicalReference: string): string | null {
    if (!canonicalReference.startsWith(this.packageName)) {
      return null;
    }

    // Use parent's parseCanonicalReference for efficient parsing
    const parser = this.parseCanonicalReference(canonicalReference);

    if (!parser.isValid) {
      return null;
    }

    const { kind, name, memberName } = parser;

    // Handle member references (e.g., Flicking.addPlugins, FlickingOptions.align)
    if (kind === "member") {
      // Docusaurus converts heading anchors to lowercase
      const anchor = memberName ? `#${memberName.toLowerCase()}` : "";

      // Determine folder based on container kind (class or interface)
      const containerKind = this.getContainerKind(canonicalReference);

      // Redirect links to inlined interfaces → class page
      if (containerKind === ApiItemKind.Interface && this._inlinedInterfaceToClass.has(name)) {
        const className = this._inlinedInterfaceToClass.get(name)!;
        return `classes/${className}.mdx${anchor}`;
      }

      const folder = containerKind === ApiItemKind.Interface ? "interfaces" : "classes";

      return `${folder}/${name}.mdx${anchor}`;
    }

    // Redirect top-level references to inlined interfaces → class page
    if (kind === "interface" && this._inlinedInterfaceToClass.has(name)) {
      const className = this._inlinedInterfaceToClass.get(name)!;
      return `classes/${className}.mdx`;
    }

    // Map kind to folder (inherited from parent)
    const folder = this.kindToFolder(kind);
    if (!folder) {
      return null;
    }

    return `${folder}/${name}.mdx`;
  }
}
