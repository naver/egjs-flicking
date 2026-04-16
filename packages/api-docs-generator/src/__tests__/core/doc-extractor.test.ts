import { TSDocParser } from "@microsoft/tsdoc";
import { describe, expect, it } from "vitest";
import { extractDocComment } from "../../core/doc-extractor";
import { sampleDocComments } from "../fixtures/doc-comments";

describe("doc-extractor", () => {
  const parser = new TSDocParser();

  describe("extractDocComment", () => {
    it("should extract summary from simple comment", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.summary).toBe("The camera element(`.flicking-camera`)");
      expect(extracted.remarks).toBeNull();
      expect(extracted.params).toHaveLength(0);
    });

    it("should extract remarks when present", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.remarks).not.toBeNull();
      expect(extracted.remarks).toContain("If there's no");
    });

    it("should extract references from summary", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.summaryReferences.length).toBeGreaterThan(0);
      expect(extracted.summaryReferences.some(ref => ref.memberIdentifiers?.includes("AnchorPoint"))).toBe(true);
    });

    it("should extract params with references", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.params).toHaveLength(1);
      expect(extracted.params[0].name).toBe("position");
      expect(extracted.params[0].description).toContain("A position to check");
    });

    it("should extract returns", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.returns).not.toBeNull();
      expect(extracted.returns).toContain("AnchorPoint");
    });

    it("should extract defaultValue", () => {
      const parserContext = parser.parseString(sampleDocComments.withDefaultValue);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.defaultValue).toBe("0");
    });

    it("should extract deprecated", () => {
      const parserContext = parser.parseString(sampleDocComments.withDeprecated);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.deprecated).not.toBeNull();
      expect(extracted.deprecated).toContain("Use newFunction instead");
    });

    it("should extract throws", () => {
      const parserContext = parser.parseString(sampleDocComments.withThrows);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.throws).toHaveLength(1);
      expect(extracted.throws[0].text).toContain("FlickingError");
    });

    it("should extract examples", () => {
      const parserContext = parser.parseString(sampleDocComments.withExample);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.examples).toHaveLength(1);
      expect(extracted.examples[0]).toContain("import Flicking");
    });

    it("should extract see also entries", () => {
      const parserContext = parser.parseString(sampleDocComments.withSee);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.seeAlso).toHaveLength(2);
      expect(
        extracted.seeAlso.some(entry => entry.references.some(ref => ref.memberIdentifiers?.includes("Flicking")))
      ).toBe(true);
    });

    it("should handle complex comments with multiple tags", () => {
      const parserContext = parser.parseString(sampleDocComments.complex);
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted.summary).toBe("Return the camera's position progress in the panel below");
      expect(extracted.remarks).toContain("Value is from 0 to 1");
      expect(extracted.params).toHaveLength(1);
      expect(extracted.returns).toContain("Progress value");
    });
  });

  describe("ExtractedDocComment structure", () => {
    it("should have all required fields initialized", () => {
      const parserContext = parser.parseString("/** Simple comment */");
      const extracted = extractDocComment(parserContext.docComment);

      expect(extracted).toHaveProperty("summary");
      expect(extracted).toHaveProperty("summaryReferences");
      expect(extracted).toHaveProperty("remarks");
      expect(extracted).toHaveProperty("remarksReferences");
      expect(extracted).toHaveProperty("params");
      expect(extracted).toHaveProperty("returns");
      expect(extracted).toHaveProperty("returnsReferences");
      expect(extracted).toHaveProperty("defaultValue");
      expect(extracted).toHaveProperty("deprecated");
      expect(extracted).toHaveProperty("throws");
      expect(extracted).toHaveProperty("examples");
      expect(extracted).toHaveProperty("seeAlso");
    });

    it("should have arrays initialized to empty arrays when no content", () => {
      const parserContext = parser.parseString("/** Simple comment */");
      const extracted = extractDocComment(parserContext.docComment);

      expect(Array.isArray(extracted.summaryReferences)).toBe(true);
      expect(Array.isArray(extracted.remarksReferences)).toBe(true);
      expect(Array.isArray(extracted.params)).toBe(true);
      expect(Array.isArray(extracted.returnsReferences)).toBe(true);
      expect(Array.isArray(extracted.throws)).toBe(true);
      expect(Array.isArray(extracted.examples)).toBe(true);
      expect(Array.isArray(extracted.seeAlso)).toBe(true);
    });
  });
});
