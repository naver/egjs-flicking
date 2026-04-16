/**
 * Pure extraction functions for TSDoc comments.
 * These functions extract data and references without any rendering logic.
 */

import type { DocCodeSpan, DocComment, DocErrorText, DocInlineTag, DocNode } from "@microsoft/tsdoc";
import { DocNodeKind } from "@microsoft/tsdoc";
import type {
  AcceptsEntry,
  DocReference,
  ExtractedDocComment,
  ExtractedParam,
  FiresEntry,
  SeeAlsoEntry,
  ThrowsEntry
} from "../types/extracted-doc";
import { createEmptyExtractedDoc } from "../types/extracted-doc";
import { isFencedCode, isLinkTag, isPlainText, isSoftBreak } from "../utils/type-guard/tsdoc";

/**
 * Result of extracting text and references from a DocNode
 */
interface ExtractionResult {
  text: string;
  references: DocReference[];
}

/**
 * Extract text and references from a DocNode tree
 */
function extractFromDocNode(node: DocNode): ExtractionResult {
  const references: DocReference[] = [];
  let text = "";

  if (isPlainText(node)) {
    return { text: node.text, references: [] };
  }

  if (isSoftBreak(node)) {
    return { text: "\n", references: [] };
  }

  if (isLinkTag(node)) {
    const ref: DocReference = {
      text: ""
    };

    if (node.urlDestination) {
      ref.urlDestination = node.urlDestination;
      ref.linkText = node.linkText || undefined;
      ref.text = node.linkText || node.urlDestination;
      text = node.linkText || node.urlDestination;
    } else if (node.codeDestination) {
      const memberRefs = node.codeDestination.memberReferences;
      const identifiers: string[] = [];

      for (const memberRef of memberRefs) {
        if (memberRef.memberIdentifier?.identifier) {
          identifiers.push(memberRef.memberIdentifier.identifier);
        }
      }

      ref.memberIdentifiers = identifiers;
      ref.linkText = node.linkText || undefined;
      ref.text = node.linkText || identifiers[identifiers.length - 1] || "";
      text = ref.text;
    } else if (node.linkText) {
      ref.text = node.linkText;
      text = node.linkText;
    }

    if (ref.text || ref.urlDestination || ref.memberIdentifiers?.length) {
      references.push(ref);
    }

    return { text, references };
  }

  if (isFencedCode(node)) {
    return { text: node.code, references: [] };
  }

  if (node.kind === DocNodeKind.CodeSpan) {
    const codeSpan = node as DocCodeSpan;
    return { text: `\`${codeSpan.code}\``, references: [] };
  }

  if (node.kind === DocNodeKind.InlineTag) {
    const inlineTag = node as DocInlineTag;
    if (inlineTag.tagContent) {
      return { text: inlineTag.tagContent, references: [] };
    }
    return { text: "", references: [] };
  }

  if (node.kind === DocNodeKind.ErrorText) {
    const errorText = node as DocErrorText;
    return { text: errorText.text, references: [] };
  }

  // Recursively process child nodes
  for (const child of node.getChildNodes()) {
    const childResult = extractFromDocNode(child);
    text += childResult.text;
    references.push(...childResult.references);
  }

  return { text, references };
}

/**
 * Extract complete documentation from a DocComment
 */
export function extractDocComment(docComment: DocComment): ExtractedDocComment {
  const result = createEmptyExtractedDoc();

  // Summary
  if (docComment.summarySection) {
    const extracted = extractFromDocNode(docComment.summarySection);
    result.summary = extracted.text.trim();
    result.summaryReferences = extracted.references;
  }

  // Remarks
  if (docComment.remarksBlock) {
    const extracted = extractFromDocNode(docComment.remarksBlock.content);
    result.remarks = extracted.text.trim();
    result.remarksReferences = extracted.references;
  }

  // Params
  for (const paramBlock of docComment.params.blocks) {
    const extracted = extractFromDocNode(paramBlock.content);
    const param: ExtractedParam = {
      name: paramBlock.parameterName,
      description: extracted.text.trim(),
      references: extracted.references
    };
    result.params.push(param);
  }

  // Returns
  if (docComment.returnsBlock) {
    const extracted = extractFromDocNode(docComment.returnsBlock.content);
    result.returns = extracted.text.trim();
    result.returnsReferences = extracted.references;
  }

  // Default value
  const defaultValueBlock = docComment.customBlocks.find(block => block.blockTag.tagName === "@defaultValue");
  if (defaultValueBlock) {
    const extracted = extractFromDocNode(defaultValueBlock.content);
    result.defaultValue = extracted.text.trim();
  }

  // Deprecated
  if (docComment.deprecatedBlock) {
    const extracted = extractFromDocNode(docComment.deprecatedBlock.content);
    result.deprecated = extracted.text.trim();
  }

  // Throws
  const throwsBlocks = docComment.customBlocks.filter(block => block.blockTag.tagName === "@throws");
  for (const throwsBlock of throwsBlocks) {
    const extracted = extractFromDocNode(throwsBlock.content);
    const text = extracted.text.trim();
    if (text) {
      const entry: ThrowsEntry = {
        text,
        references: extracted.references
      };
      result.throws.push(entry);
    }
  }

  // Examples
  const exampleBlocks = docComment.customBlocks.filter(block => block.blockTag.tagName === "@example");
  for (const exampleBlock of exampleBlocks) {
    const extracted = extractFromDocNode(exampleBlock.content);
    const text = extracted.text.trim();
    if (text) {
      result.examples.push(text);
    }
  }

  // Fires (custom tag for event emissions)
  const firesBlocks = docComment.customBlocks.filter(block => block.blockTag.tagName === "@fires");
  for (const firesBlock of firesBlocks) {
    const extracted = extractFromDocNode(firesBlock.content);
    const text = extracted.text.trim();
    if (text) {
      const entry: FiresEntry = {
        text,
        references: extracted.references
      };
      result.fires.push(entry);
    }
  }

  // Accepts (custom tag for constant value references)
  const acceptsBlocks = docComment.customBlocks.filter(block => block.blockTag.tagName === "@accepts");
  for (const acceptsBlock of acceptsBlocks) {
    const extracted = extractFromDocNode(acceptsBlock.content);
    const text = extracted.text.trim();
    if (text) {
      const entry: AcceptsEntry = {
        text,
        references: extracted.references
      };
      result.accepts.push(entry);
    }
  }

  // See also
  for (const seeBlock of docComment.seeBlocks) {
    const extracted = extractFromDocNode(seeBlock.content);
    const entry: SeeAlsoEntry = {
      text: extracted.text.trim(),
      references: extracted.references
    };
    if (entry.text) {
      result.seeAlso.push(entry);
    }
  }

  // Since
  const sinceBlock = docComment.customBlocks.find(block => block.blockTag.tagName === "@since");
  if (sinceBlock) {
    const extracted = extractFromDocNode(sinceBlock.content);
    result.since = extracted.text.trim();
  }

  // Dependencies
  const dependencyBlocks = docComment.customBlocks.filter(block => block.blockTag.tagName === "@dependency");
  for (const depBlock of dependencyBlocks) {
    const extracted = extractFromDocNode(depBlock.content);
    const text = extracted.text.trim();
    if (text) {
      // Parse format: "Type - Description"
      const dashIndex = text.indexOf(" - ");
      if (dashIndex > 0) {
        const type = text.substring(0, dashIndex).trim();
        const description = text.substring(dashIndex + 3).trim();
        result.dependencies.push({
          type,
          description,
          references: extracted.references
        });
      } else {
        // Fallback: no type specified, use "General"
        result.dependencies.push({
          type: "General",
          description: text,
          references: extracted.references
        });
      }
    }
  }

  return result;
}
