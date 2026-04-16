/**
 * Markdown rendering functions that convert extracted data to markdown.
 * Separates rendering logic from extraction logic.
 */

import type { DocReference, ExtractedDocComment, ExtractedParam, SeeAlsoEntry } from "../types/extracted-doc";
import type { DocumentationContext } from "./documentation-context";

/**
 * Render a DocReference to markdown link
 */
export function renderReferenceToMarkdown(
  ref: DocReference,
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  // URL link
  if (ref.urlDestination) {
    const linkText = ref.linkText || ref.urlDestination;

    // Convert site-internal URLs to relative paths for client-side navigation
    const relativePath = ctx.convertSiteUrlToRelativePath(ref.urlDestination, currentFilePath);
    if (relativePath) {
      return `[${linkText}](${relativePath})`;
    }

    return `[${linkText}](${ref.urlDestination})`;
  }

  // API reference
  if (ref.memberIdentifiers && ref.memberIdentifiers.length > 0) {
    const qualifiedName = ref.memberIdentifiers.join(".");
    let canonicalRef = ctx.resolveReference(qualifiedName);

    // Try last identifier if qualified name not found
    if (!canonicalRef && ref.memberIdentifiers.length > 0) {
      canonicalRef = ctx.resolveReference(ref.memberIdentifiers[ref.memberIdentifiers.length - 1]);
    }

    if (canonicalRef) {
      const targetPath = ctx.canonicalReferenceToPath(canonicalRef);
      if (targetPath) {
        const relativeLink = ctx.resolveRelativeLink(currentFilePath, targetPath);
        const linkText = ref.linkText || ref.memberIdentifiers[ref.memberIdentifiers.length - 1] || "link";
        return `[${linkText}](${relativeLink})`;
      }
    }

    // Fallback: show as code
    return `\`${ref.linkText || ref.memberIdentifiers[ref.memberIdentifiers.length - 1] || "unknown"}\``;
  }

  return ref.text || "";
}

/**
 * Render text with embedded references to markdown
 */
export function renderTextWithReferences(
  text: string,
  references: DocReference[],
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  if (references.length === 0) {
    return text;
  }

  // Use placeholders to prevent double-replacement of same text
  // e.g., when "circular" appears twice, replacing it would affect already-replaced markdown links
  const placeholders: Map<string, string> = new Map();
  let result = text;

  // First pass: replace each reference with a unique placeholder
  for (let i = 0; i < references.length; i++) {
    const ref = references[i];
    const searchText = ref.text;
    if (searchText) {
      const placeholder = `\x00REF_${i}\x00`;
      // Replace first occurrence only
      const idx = result.indexOf(searchText);
      if (idx !== -1) {
        result = result.slice(0, idx) + placeholder + result.slice(idx + searchText.length);
        placeholders.set(placeholder, renderReferenceToMarkdown(ref, currentFilePath, ctx));
      }
    }
  }

  // Second pass: replace placeholders with rendered markdown
  for (const [placeholder, rendered] of placeholders) {
    result = result.replace(placeholder, rendered);
  }

  return result;
}

/**
 * Render summary to markdown
 */
export function renderSummaryMarkdown(
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  return renderTextWithReferences(doc.summary, doc.summaryReferences, currentFilePath, ctx);
}

/**
 * Post-process remarks text to ensure proper markdown list formatting.
 * Converts inline list items (e.g., "text - item1 - item2") to proper markdown lists.
 */
function postProcessRemarksForMarkdown(text: string): string {
  // Ensure list items start on their own line with a blank line before
  // Pattern: newline followed by "- " that isn't already preceded by blank line
  let result = text.replace(/\n(?!\n)(- )/g, "\n\n$1");

  // Also handle cases where "- " appears after a colon with just a newline
  // e.g., "Common causes:\n- item" -> "Common causes:\n\n- item"
  result = result.replace(/(:\n)(?!\n)(- )/g, "$1\n$2");

  return result;
}

/**
 * Render remarks to markdown
 */
export function renderRemarksMarkdown(
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): string | null {
  if (!doc.remarks) {
    return null;
  }

  const rendered = renderTextWithReferences(doc.remarks, doc.remarksReferences, currentFilePath, ctx);

  return postProcessRemarksForMarkdown(rendered);
}

/**
 * Render params to markdown
 */
export function renderParamsMarkdown(
  params: ExtractedParam[],
  currentFilePath: string,
  ctx: DocumentationContext
): ExtractedParam[] {
  return params.map(param => ({
    name: param.name,
    description: renderTextWithReferences(param.description, param.references, currentFilePath, ctx),
    references: param.references
  }));
}

/**
 * Render see also entries to markdown
 */
export function renderSeeAlsoMarkdown(
  seeAlso: SeeAlsoEntry[],
  currentFilePath: string,
  ctx: DocumentationContext
): string[] {
  return seeAlso.map(entry => renderTextWithReferences(entry.text, entry.references, currentFilePath, ctx));
}

/**
 * Render returns to markdown
 */
export function renderReturnsMarkdown(
  doc: ExtractedDocComment,
  currentFilePath: string,
  ctx: DocumentationContext
): string | null {
  if (!doc.returns) {
    return null;
  }

  return renderTextWithReferences(doc.returns, doc.returnsReferences, currentFilePath, ctx);
}
