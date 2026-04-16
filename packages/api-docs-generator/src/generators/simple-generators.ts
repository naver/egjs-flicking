import type { ApiFunction, ApiTypeAlias, ApiVariable } from "@microsoft/api-extractor-model";
import { extractDocComment } from "../core/doc-extractor";
import type { DocumentationContext } from "../core/documentation-context";
import {
  buildDocHeaderSection,
  buildExamplesSection,
  buildParametersSection,
  buildRemarksSection
} from "../core/section-builder";
import { extractTypeString } from "../parsers/type-info";
import { MarkdownBuilder } from "./markdown-builder";

/**
 * Generate markdown documentation for a function
 */
export function generateFunctionMarkdown(
  apiFunction: ApiFunction,
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  const md = new MarkdownBuilder();

  // Title
  md.heading(1, apiFunction.displayName);

  // Extract doc comment once
  const doc = apiFunction.tsdocComment ? extractDocComment(apiFunction.tsdocComment) : null;

  // Header section (summary + deprecated + remarks)
  if (doc) {
    buildDocHeaderSection(md, doc, currentFilePath, ctx);
    buildRemarksSection(md, doc, currentFilePath, ctx);
  }

  // Signature
  md.heading(2, "Signature");
  const signature = extractTypeString(apiFunction.excerptTokens);
  md.codeBlock(signature, "typescript");

  // Parameters, Returns, Examples
  if (doc) {
    buildParametersSection(md, apiFunction.parameters, doc, currentFilePath, ctx, {
      headingLevel: 2,
      format: "bold"
    });

    // Returns
    if (doc.returns) {
      md.heading(2, "Returns");
      md.paragraph(doc.returns);
    }

    // Examples
    buildExamplesSection(md, doc);
  }

  return md.build();
}

/**
 * Generate markdown documentation for a variable/constant
 */
export function generateVariableMarkdown(
  apiVariable: ApiVariable,
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  const md = new MarkdownBuilder();

  // Title
  md.heading(1, apiVariable.displayName);

  // Extract doc comment once
  const doc = apiVariable.tsdocComment ? extractDocComment(apiVariable.tsdocComment) : null;

  // Header section (summary + deprecated + remarks)
  if (doc) {
    buildDocHeaderSection(md, doc, currentFilePath, ctx);
    buildRemarksSection(md, doc, currentFilePath, ctx);
  }

  // Type & Value
  md.heading(2, "Type");
  if (apiVariable.variableTypeExcerpt) {
    const typeString = extractTypeString(apiVariable.variableTypeExcerpt.spannedTokens);
    md.codeBlock(typeString, "typescript");
  }

  // Examples
  if (doc) {
    buildExamplesSection(md, doc);
  }

  return md.build();
}

/**
 * Generate markdown documentation for a type alias
 */
export function generateTypeAliasMarkdown(
  apiTypeAlias: ApiTypeAlias,
  currentFilePath: string,
  ctx: DocumentationContext
): string {
  const md = new MarkdownBuilder();

  // Title
  md.heading(1, apiTypeAlias.displayName);

  // Extract doc comment once
  const doc = apiTypeAlias.tsdocComment ? extractDocComment(apiTypeAlias.tsdocComment) : null;

  // Header section (summary + deprecated + remarks)
  if (doc) {
    buildDocHeaderSection(md, doc, currentFilePath, ctx);
    buildRemarksSection(md, doc, currentFilePath, ctx);
  }

  // Type definition
  md.heading(2, "Type");
  if (apiTypeAlias.typeExcerpt) {
    const typeString = extractTypeString(apiTypeAlias.typeExcerpt.spannedTokens);
    md.codeBlock(`type ${apiTypeAlias.displayName} = ${typeString}`, "typescript");
  }

  // Examples
  if (doc) {
    buildExamplesSection(md, doc);
  }

  return md.build();
}
