import type {
  ApiClass,
  ApiConstructor,
  ApiInterface,
  ApiMethod,
  ApiProperty,
  ApiPropertySignature
} from "@microsoft/api-extractor-model";
import { extractDocComment } from "../core/doc-extractor";
import type { DocumentationContext } from "../core/documentation-context";
import { renderRemarksMarkdown, renderSummaryMarkdown } from "../core/markdown-renderer";
import {
  buildDeprecatedSection,
  buildExamplesSection,
  buildFiresSection,
  buildParametersSection,
  buildPropertyMetadataSection,
  buildRemarksSection,
  buildSeeAlsoSection,
  buildSinceSection,
  buildSummarySection,
  buildThrowsSection
} from "../core/section-builder";
import { extractTypeString } from "../parsers/type-info";
import { generatePropertySignatureSection } from "./interface-generator";
import { MarkdownBuilder } from "./markdown-builder";

/**
 * Generate markdown documentation for a class
 */
export function generateClassMarkdown(
  apiClass: ApiClass,
  currentFilePath: string,
  ctx: DocumentationContext,
  optionsInterface?: ApiInterface
): string {
  const md = new MarkdownBuilder();

  // Extract doc comment once for both header and footer
  const doc = apiClass.tsdocComment ? extractDocComment(apiClass.tsdocComment) : null;

  // Title
  md.heading(1, apiClass.displayName);
  if (doc) buildSinceSection(md, doc);

  // Header section (summary + deprecated + see also) using section-builder
  if (doc) {
    buildSummarySection(md, doc, currentFilePath, ctx);
    buildSeeAlsoSection(md, doc, currentFilePath, ctx, "bold");
    buildDeprecatedSection(md, doc);
    buildRemarksSection(md, doc, currentFilePath, ctx);
  }

  // Constructor
  const ctor = apiClass.members.find(m => m.kind === "Constructor") as ApiConstructor | undefined;
  if (ctor) {
    md.heading(2, "Constructor");
    generateConstructorSection(md, ctor, currentFilePath, ctx);
  }

  // Options (inlined from options interface)
  if (optionsInterface) {
    const optionProperties = optionsInterface.members.filter(
      m => m.kind === "PropertySignature"
    ) as ApiPropertySignature[];
    if (optionProperties.length > 0) {
      md.heading(2, "Options");
      for (const property of optionProperties) {
        generatePropertySignatureSection(md, property, currentFilePath, ctx);
      }
    }
  }

  // Properties
  const properties = apiClass.members.filter(m => m.kind === "Property") as ApiProperty[];
  if (properties.length > 0) {
    md.heading(2, "Properties");
    for (const property of properties) {
      generatePropertySection(md, property, currentFilePath, ctx);
    }
  }

  // Methods
  const methods = apiClass.members.filter(m => m.kind === "Method") as ApiMethod[];
  if (methods.length > 0) {
    md.heading(2, "Methods");
    for (const method of methods) {
      generateMethodSection(md, method, currentFilePath, ctx);
    }
  }

  // Footer section (examples only, see also is shown in header)
  if (doc) {
    buildExamplesSection(md, doc);
  }

  return md.build();
}

function generateConstructorSection(
  md: MarkdownBuilder,
  ctor: ApiConstructor,
  currentFilePath: string,
  ctx: DocumentationContext
): void {
  // Signature
  const signature = extractTypeString(ctor.excerptTokens);
  md.codeBlock(signature, "typescript");

  // Doc comment
  if (ctor.tsdocComment) {
    const doc = extractDocComment(ctor.tsdocComment);
    const summary = renderSummaryMarkdown(doc, currentFilePath, ctx);
    if (summary) {
      md.paragraph(summary);
    }

    // Parameters
    buildParametersSection(md, ctor.parameters, doc, currentFilePath, ctx, {
      headingLevel: 3,
      format: "bold"
    });

    // Remarks
    const remarks = renderRemarksMarkdown(doc, currentFilePath, ctx);
    if (remarks) {
      md.paragraph(`**Remarks:** ${remarks}`);
    }

    // Throws
    buildThrowsSection(md, doc, currentFilePath, ctx);

    // Fires (events emitted)
    buildFiresSection(md, doc, currentFilePath, ctx);

    // Deprecated
    if (doc.deprecated) {
      md.paragraph(`**⚠️ Deprecated:** ${doc.deprecated}`);
    }

    // Examples
    if (doc.examples.length > 0) {
      md.heading(3, "Examples");
      for (const example of doc.examples) {
        md.codeBlock(example, "typescript");
      }
    }
  }
}

function generatePropertySection(
  md: MarkdownBuilder,
  property: ApiProperty,
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

    // Remarks
    const remarks = renderRemarksMarkdown(doc, currentFilePath, ctx);
    if (remarks) {
      md.paragraph(`**Remarks:** ${remarks}`);
    }

    // Property metadata (default, deprecated, see also)
    buildPropertyMetadataSection(md, doc, currentFilePath, ctx);
  }

  // Read-only indicator
  if (property.isReadonly) {
    md.paragraph("*This property is read-only.*");
  }
  md.divEnd();
}

function generateMethodSection(
  md: MarkdownBuilder,
  method: ApiMethod,
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

    // Parameters
    buildParametersSection(md, method.parameters, doc, currentFilePath, ctx, {
      useHeading: false,
      format: "normal"
    });

    // Returns
    if (doc.returns) {
      md.paragraph(`**Returns:** ${doc.returns}`);
    }

    // Remarks
    const remarks = renderRemarksMarkdown(doc, currentFilePath, ctx);
    if (remarks) {
      md.paragraph(`**Remarks:** ${remarks}`);
    }

    // Throws
    buildThrowsSection(md, doc, currentFilePath, ctx);

    // Fires (events emitted)
    buildFiresSection(md, doc, currentFilePath, ctx);

    // Deprecated
    if (doc.deprecated) {
      md.paragraph(`**⚠️ Deprecated:** ${doc.deprecated}`);
    }
  }
  md.divEnd();
}
