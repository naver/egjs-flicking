import type { ApiInterface, ApiMethodSignature, ApiPropertySignature } from "@microsoft/api-extractor-model";
import { extractDocComment } from "../core/doc-extractor";
import type { DocumentationContext } from "../core/documentation-context";
import { renderRemarksMarkdown, renderSummaryMarkdown, renderTextWithReferences } from "../core/markdown-renderer";
import {
  buildAcceptsSection,
  buildDeprecatedSection,
  buildDocFooterSection,
  buildDocHeaderSection,
  buildRemarksSection,
  buildSeeAlsoSection,
  buildSinceSection
} from "../core/section-builder";
import { extractTypeString } from "../parsers/type-info";
import { MarkdownBuilder } from "./markdown-builder";

/**
 * Generate markdown documentation for an interface
 */
export function generateInterfaceMarkdown(
  apiInterface: ApiInterface,
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  const md = new MarkdownBuilder();

  // Extract doc comment once for both header and footer
  const doc = apiInterface.tsdocComment ? extractDocComment(apiInterface.tsdocComment) : null;

  // Title
  md.heading(1, apiInterface.displayName);
  if (doc) buildSinceSection(md, doc);

  // Header section (summary + deprecated + remarks)
  if (doc) {
    buildDocHeaderSection(md, doc, currentFilePath, ctx);
    buildRemarksSection(md, doc, currentFilePath, ctx);
  }

  // Properties
  const properties = apiInterface.members.filter(m => m.kind === "PropertySignature") as ApiPropertySignature[];
  if (properties.length > 0) {
    md.heading(2, "Properties");
    for (const property of properties) {
      generatePropertySignatureSection(md, property, currentFilePath, ctx);
    }
  }

  // Method Signatures
  const methods = apiInterface.members.filter(m => m.kind === "MethodSignature") as ApiMethodSignature[];
  if (methods.length > 0) {
    md.heading(2, "Methods");
    for (const method of methods) {
      generateMethodSignatureSection(md, method, currentFilePath, ctx);
    }
  }

  // Footer section (examples + see also)
  if (doc) {
    buildDocFooterSection(md, doc, currentFilePath, ctx);
  }

  return md.build();
}

export function generatePropertySignatureSection(
  md: MarkdownBuilder,
  property: ApiPropertySignature,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  md.divStart("api-property");

  const doc = property.tsdocComment ? extractDocComment(property.tsdocComment) : null;
  md.heading(3, property.displayName);
  if (doc) buildSinceSection(md, doc);

  // Type
  if (property.propertyTypeExcerpt) {
    const typeString = extractTypeString(property.propertyTypeExcerpt.spannedTokens);

    md.paragraph(`**Type:** ${md.inlineCode(typeString)}`);
  }

  // Doc comment
  if (doc) {
    const summary = renderSummaryMarkdown(doc, currentFilePath, ctx);
    if (summary) {
      md.paragraph(summary);
    }

    // Default value
    if (doc.defaultValue) {
      md.paragraph(`**Default:** ${md.inlineCode(doc.defaultValue)}`);
    }

    // Accepts (constant values)
    buildAcceptsSection(md, doc, currentFilePath, ctx);

    // Dependencies (if custom tags used)
    if (doc.dependencies.length > 0) {
      md.paragraph(`**Dependencies:**`);

      // Group by type
      const depsByType = new Map<string, typeof doc.dependencies>();
      for (const dep of doc.dependencies) {
        if (!depsByType.has(dep.type)) {
          depsByType.set(dep.type, []);
        }
        const typeGroup = depsByType.get(dep.type);
        if (typeGroup) {
          typeGroup.push(dep);
        }
      }

      // Render in order: Conditional, Mutual Exclusive, Related, Requires, General, others
      const typeOrder = ["Conditional", "Mutual Exclusive", "Related", "Requires", "General"];
      const renderedTypes = new Set<string>();

      for (const type of typeOrder) {
        const deps = depsByType.get(type);
        if (deps) {
          for (const dep of deps) {
            const renderedDesc = renderTextWithReferences(dep.description, dep.references, currentFilePath, ctx);
            md.paragraph(`- **${dep.type}**: ${renderedDesc}`);
          }
          renderedTypes.add(type);
        }
      }

      // Render any remaining types not in the standard order
      for (const [type, deps] of depsByType) {
        if (!renderedTypes.has(type)) {
          for (const dep of deps) {
            const renderedDesc = renderTextWithReferences(dep.description, dep.references, currentFilePath, ctx);
            md.paragraph(`- **${dep.type}**: ${renderedDesc}`);
          }
        }
      }
    } else {
      // Fallback to remarks if no dependencies custom tags
      const remarks = renderRemarksMarkdown(doc, currentFilePath, ctx);
      if (remarks) {
        md.paragraph(`**Remarks:** ${remarks}`);
      }
    }

    // Examples
    if (doc.examples.length > 0) {
      md.paragraph(`**Example:**`);
      for (const example of doc.examples) {
        md.codeBlock(example, "typescript");
      }
    }

    // Deprecated and See Also using shared section builders
    buildDeprecatedSection(md, doc);
    buildSeeAlsoSection(md, doc, currentFilePath, ctx, "bold");
  }

  // Optional indicator
  if (property.isOptional) {
    md.paragraph("*This property is optional.*");
  }
  md.divEnd();
}

function generateMethodSignatureSection(
  md: MarkdownBuilder,
  method: ApiMethodSignature,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  md.divStart("api-method");

  const doc = method.tsdocComment ? extractDocComment(method.tsdocComment) : null;
  md.heading(3, method.displayName);
  if (doc) buildSinceSection(md, doc);

  // Signature
  const signature = extractTypeString(method.excerptTokens);
  md.codeBlock(signature, "typescript");

  // Doc comment
  if (doc) {
    const summary = renderSummaryMarkdown(doc, currentFilePath, ctx);
    if (summary) {
      md.paragraph(summary);
    }

    // Remarks
    const remarks = renderRemarksMarkdown(doc, currentFilePath, ctx);
    if (remarks) {
      md.paragraph(`**Remarks:** ${remarks}`);
    }

    // Deprecated
    if (doc.deprecated) {
      md.paragraph(`**⚠️ Deprecated:** ${doc.deprecated}`);
    }
  }
  md.divEnd();
}
