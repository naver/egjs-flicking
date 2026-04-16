/**
 * Tests for common section builder utilities
 */
import { describe, expect, it, vi } from "vitest";
import {
  buildDeprecatedSection,
  buildDocHeaderSection,
  buildExamplesSection,
  buildRemarksSection,
  buildSeeAlsoSection,
  buildSummarySection
} from "../../core/section-builder";
import { MarkdownBuilder } from "../../generators/markdown-builder";
import { createEmptyExtractedDoc } from "../../types/extracted-doc";

// Mock DocumentationContext
const mockCtx = {
  canonicalReferenceToPath: vi.fn().mockReturnValue(null),
  resolveRelativeLink: vi.fn((from, to) => to)
} as any;

describe("Section Builder", () => {
  describe("buildSummarySection", () => {
    it("should render summary as blockquote", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.summary = "This is a summary";

      buildSummarySection(md, doc, "test.md", mockCtx);

      const result = md.build();
      expect(result).toContain("> This is a summary");
    });

    it("should not render anything for empty summary", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.summary = "";

      buildSummarySection(md, doc, "test.md", mockCtx);

      const result = md.build();
      expect(result).toBe("");
    });
  });

  describe("buildDeprecatedSection", () => {
    it("should render deprecated warning", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.deprecated = "Use newFunction instead";

      buildDeprecatedSection(md, doc);

      const result = md.build();
      expect(result).toContain("Deprecated");
      expect(result).toContain("Use newFunction instead");
    });

    it("should not render anything when not deprecated", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();

      buildDeprecatedSection(md, doc);

      const result = md.build();
      expect(result).toBe("");
    });
  });

  describe("buildRemarksSection", () => {
    it("should render remarks with heading", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.remarks = "Additional details here";

      buildRemarksSection(md, doc, "test.md", mockCtx, "Description");

      const result = md.build();
      expect(result).toContain("## Description");
      expect(result).toContain("Additional details here");
    });

    it("should not render anything for empty remarks", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();

      buildRemarksSection(md, doc, "test.md", mockCtx, "Description");

      const result = md.build();
      expect(result).toBe("");
    });
  });

  describe("buildExamplesSection", () => {
    it("should render examples as code blocks", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.examples = ["const x = 1;", "const y = 2;"];

      buildExamplesSection(md, doc);

      const result = md.build();
      expect(result).toContain("## Examples");
      expect(result).toContain("```typescript");
      expect(result).toContain("const x = 1;");
      expect(result).toContain("const y = 2;");
    });

    it("should not render anything for empty examples", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();

      buildExamplesSection(md, doc);

      const result = md.build();
      expect(result).toBe("");
    });
  });

  describe("buildSeeAlsoSection", () => {
    it("should render see also links", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.seeAlso = [
        { text: "Flicking", references: [] },
        { text: "Panel", references: [] }
      ];

      buildSeeAlsoSection(md, doc, "test.md", mockCtx);

      const result = md.build();
      expect(result).toContain("## See Also");
      expect(result).toContain("Flicking");
      expect(result).toContain("Panel");
    });

    it("should not render anything for empty seeAlso", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();

      buildSeeAlsoSection(md, doc, "test.md", mockCtx);

      const result = md.build();
      expect(result).toBe("");
    });
  });

  describe("buildDocHeaderSection", () => {
    it("should render summary and deprecated together", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.summary = "A useful function";
      doc.deprecated = "Use betterFunction instead";

      buildDocHeaderSection(md, doc, "test.md", mockCtx);

      const result = md.build();
      expect(result).toContain("> A useful function");
      expect(result).toContain("Deprecated");
      expect(result).toContain("Use betterFunction instead");
    });

    it("should render only summary when not deprecated", () => {
      const md = new MarkdownBuilder();
      const doc = createEmptyExtractedDoc();
      doc.summary = "A useful function";

      buildDocHeaderSection(md, doc, "test.md", mockCtx);

      const result = md.build();
      expect(result).toContain("> A useful function");
      expect(result).not.toContain("Deprecated");
    });
  });
});
