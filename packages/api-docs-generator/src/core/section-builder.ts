/**
 * Common section builders for documentation generators.
 * These functions build standard documentation sections to eliminate
 * duplicated code across different generators.
 */

import type { Parameter } from "@microsoft/api-extractor-model";
import type { MarkdownBuilder } from "../generators/markdown-builder";
import { extractTypeString } from "../parsers/type-info";
import type { ExtractedDocComment } from "../types/extracted-doc";
import type { DocumentationContext } from "./documentation-context";
import {
  renderParamsMarkdown,
  renderRemarksMarkdown,
  renderSeeAlsoMarkdown,
  renderSummaryMarkdown,
  renderTextWithReferences
} from "./markdown-renderer";

/**
 * Build summary section as blockquote
 */
export function buildSummarySection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  const summary = renderSummaryMarkdown(doc, currentFilePath, ctx);
  if (summary) {
    md.blockquote(summary);
  }
}

/**
 * Build deprecated warning section
 */
export function buildDeprecatedSection(md: MarkdownBuilder, doc: ExtractedDocComment): void {
  if (doc.deprecated) {
    md.paragraph(`**⚠️ Deprecated:** ${doc.deprecated}`);
  }
}

/**
 * Build since version indicator below heading
 */
export function buildSinceSection(md: MarkdownBuilder, doc: ExtractedDocComment): void {
  if (doc.since) {
    md.raw(`<div className="api-since">since v${doc.since}</div>`);
    md.newline();
  }
}

/**
 * Build remarks/description section with heading
 */
export function buildRemarksSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext,
  headingText = "Description",
  headingLevel = 2
): void {
  const remarks = renderRemarksMarkdown(doc, currentFilePath, ctx);
  if (remarks) {
    md.heading(headingLevel, headingText);
    md.paragraph(remarks);
  }
}

/**
 * Build examples section with code blocks
 */
export function buildExamplesSection(md: MarkdownBuilder, doc: ExtractedDocComment, headingLevel = 2): void {
  if (doc.examples.length > 0) {
    md.heading(headingLevel, "Examples");
    for (const example of doc.examples) {
      md.codeBlock(example, "typescript");
    }
  }
}

/**
 * Build see also section with links
 */
export function buildSeeAlsoSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext,
  headingLevel: number | "bold" = 2
): void {
  const seeAlso = renderSeeAlsoMarkdown(doc.seeAlso, currentFilePath, ctx);
  if (seeAlso.length > 0) {
    if (headingLevel === "bold") {
      md.paragraph(`**See Also:**`);
    } else {
      md.heading(headingLevel, "See Also");
    }
    for (const see of seeAlso) {
      md.paragraph(`- ${see}`);
    }
  }
}

/**
 * Build standard documentation header (summary + deprecated)
 * This is the common pattern used at the top of most doc pages.
 */
export function buildDocHeaderSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  buildSummarySection(md, doc, currentFilePath, ctx);
  buildDeprecatedSection(md, doc);
}

/**
 * Build standard documentation footer (examples + see also)
 * This is the common pattern used at the bottom of most doc pages.
 */
export function buildDocFooterSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext,
  headingLevel = 2
): void {
  buildExamplesSection(md, doc, headingLevel);
  buildSeeAlsoSection(md, doc, currentFilePath, ctx, headingLevel);
}

/**
 * Build parameters section with type information
 * This eliminates duplicated parameter rendering logic across generators
 */
export function buildParametersSection(
  md: MarkdownBuilder,
  parameters: readonly Parameter[],
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext,
  options: {
    headingLevel?: number;
    useHeading?: boolean;
    format?: "bold" | "normal";
  } = {}
): void {
  const { headingLevel = 3, useHeading = true, format = "bold" } = options;

  const params = renderParamsMarkdown(doc.params, currentFilePath, ctx);
  if (params.length > 0 && parameters.length > 0) {
    if (useHeading) {
      md.heading(headingLevel, "Parameters");
    } else {
      md.paragraph("**Parameters:**");
    }

    for (const param of parameters) {
      const paramDoc = params.find(p => p.name === param.name);
      const description = paramDoc?.description || "";

      // Get parameter type
      let typeString = "";
      if (param.parameterTypeExcerpt) {
        typeString = extractTypeString(param.parameterTypeExcerpt.spannedTokens);
      }

      // Format based on style
      if (format === "bold") {
        md.paragraph(
          `**${md.inlineCode(param.name)}** ${typeString ? `(${md.inlineCode(typeString)})` : ""} - ${description}`
        );
      } else {
        md.paragraph(`- ${md.inlineCode(param.name)} (${md.inlineCode(typeString)}) - ${description}`);
      }
    }
  }
}

/**
 * Build throws section with rendered references
 */
export function buildThrowsSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  if (doc.throws.length > 0) {
    md.paragraph(`**Throws:**`);
    for (const entry of doc.throws) {
      const rendered = renderTextWithReferences(entry.text, entry.references, currentFilePath, ctx);
      md.paragraph(`- ${rendered}`);
    }
  }
}

/**
 * Build fires (events emitted) section with rendered references
 */
export function buildFiresSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  if (doc.fires.length > 0) {
    md.paragraph(`**Fires:**`);
    for (const entry of doc.fires) {
      const rendered = renderTextWithReferences(entry.text, entry.references, currentFilePath, ctx);
      md.paragraph(`- ${rendered}`);
    }
  }
}

/**
 * Build accepts section showing which constant values an option accepts.
 * Renders: **Accepts:** [ALIGN](link) - `"prev"` | `"center"` | `"next"`
 */
export function buildAcceptsSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  if (doc.accepts.length === 0) return;

  for (const entry of doc.accepts) {
    // Find the constant name from the reference
    const ref = entry.references[0];
    if (!ref) continue;

    const constantName = ref.memberIdentifiers?.[ref.memberIdentifiers.length - 1] || ref.text;

    // Render the constant as a link
    const rendered = renderTextWithReferences(entry.text, entry.references, currentFilePath, ctx);

    // Auto-extract values from the constant definition
    const values = ctx.getConstantValues(constantName);
    if (values.length > 0) {
      const valueStr = values.map(v => `\`"${v}"\``).join(" | ");
      md.paragraph(`**Accepts:** ${rendered} - ${valueStr}`);
    } else {
      md.paragraph(`**Accepts:** ${rendered}`);
    }
  }
}

/**
 * Build property metadata sections (default value, deprecated, see also)
 * This eliminates duplicated property metadata rendering across generators
 */
export function buildPropertyMetadataSection(
  md: MarkdownBuilder,
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  // Default value
  if (doc.defaultValue) {
    md.paragraph(`**Default:** ${md.inlineCode(doc.defaultValue)}`);
  }

  // Deprecated
  if (doc.deprecated) {
    md.paragraph(`**⚠️ Deprecated:** ${doc.deprecated}`);
  }

  // See Also
  const seeAlso = renderSeeAlsoMarkdown(doc.seeAlso, currentFilePath, ctx);
  if (seeAlso.length > 0) {
    md.paragraph(`**See Also:**`);
    for (const see of seeAlso) {
      md.paragraph(`- ${see}`);
    }
  }
}
