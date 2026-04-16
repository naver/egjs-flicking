import { TSDocParser } from "@microsoft/tsdoc";
import { describe, expect, it } from "vitest";
import { extractDocComment } from "../../core/doc-extractor";
import { sampleDocComments } from "../fixtures/doc-comments";

describe("doc-comment parsers (via extractDocComment)", () => {
  const parser = new TSDocParser();

  describe("summary", () => {
    it("should extract simple summary text", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.summary).toBe("The camera element(`.flicking-camera`)");
    });

    it("should extract summary with inline links", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.summary).toContain("Return");
      expect(doc.summary).toContain("AnchorPoint");
      expect(doc.summary).toContain("given position");
    });

    it("should handle complex summary", () => {
      const parserContext = parser.parseString(sampleDocComments.complex);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.summary).toBe("Return the camera's position progress in the panel below");
    });
  });

  describe("remarks", () => {
    it("should return null when no remarks block exists", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.remarks).toBeNull();
    });

    it("should extract remarks text", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.remarks).not.toBeNull();
      expect(doc.remarks).toContain("If there's no");
      expect(doc.remarks).toContain("return `null` instead");
    });

    it("should extract complex remarks", () => {
      const parserContext = parser.parseString(sampleDocComments.complex);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.remarks).not.toBeNull();
      expect(doc.remarks).toContain("Value is from 0 to 1");
      expect(doc.remarks).toContain("lower than 0 or bigger than 1");
    });
  });

  describe("params", () => {
    it("should return empty array when no params exist", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.params).toEqual([]);
    });

    it("should extract single param", () => {
      const parserContext = parser.parseString(sampleDocComments.withParamAndReturns);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.params).toHaveLength(1);
      expect(doc.params[0].name).toBe("pos");
      expect(doc.params[0].description).toContain("A new position");
    });

    it("should extract param with description", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.params).toHaveLength(1);
      expect(doc.params[0].name).toBe("position");
      expect(doc.params[0].description).toContain("A position to check");
    });
  });

  describe("returns", () => {
    it("should return null when no returns block exists", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.returns).toBeNull();
    });

    it("should extract returns description", () => {
      const parserContext = parser.parseString(sampleDocComments.withRemarks);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.returns).not.toBeNull();
      expect(doc.returns).toContain("The");
      expect(doc.returns).toContain("AnchorPoint");
    });

    it("should extract complex returns description", () => {
      const parserContext = parser.parseString(sampleDocComments.complex);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.returns).not.toBeNull();
      expect(doc.returns).toContain("Progress value from 0 to 1");
    });
  });

  describe("defaultValue", () => {
    it("should return null when no defaultValue exists", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.defaultValue).toBeNull();
    });

    it("should extract defaultValue", () => {
      const parserContext = parser.parseString(sampleDocComments.withDefaultValue);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.defaultValue).toBe("0");
    });
  });

  describe("throws", () => {
    it("should return empty array when no throws blocks exist", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.throws).toEqual([]);
    });

    it("should extract throws description", () => {
      const parserContext = parser.parseString(sampleDocComments.withThrows);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.throws).toHaveLength(1);
      expect(doc.throws[0].text).toContain("FlickingError");
      expect(doc.throws[0].text).toContain("VAL_MUST_NOT_NULL");
    });
  });

  describe("examples", () => {
    it("should return empty array when no examples exist", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.examples).toEqual([]);
    });

    it("should extract example code", () => {
      const parserContext = parser.parseString(sampleDocComments.withExample);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.examples).toHaveLength(1);
      expect(doc.examples[0]).toContain("import Flicking");
      expect(doc.examples[0]).toContain("new Flicking");
      expect(doc.examples[0]).toContain("reactiveObj.currentPanelIndex");
    });
  });

  describe("seeAlso", () => {
    it("should return empty array when no see blocks exist", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.seeAlso).toEqual([]);
    });

    it("should extract see also references", () => {
      const parserContext = parser.parseString(sampleDocComments.withSee);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.seeAlso).toHaveLength(2);
      expect(doc.seeAlso[0].text).toContain("Flicking");
      expect(doc.seeAlso[1].text).toContain("Panel");
    });
  });

  describe("deprecated", () => {
    it("should return null when not deprecated", () => {
      const parserContext = parser.parseString(sampleDocComments.simple);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.deprecated).toBeNull();
    });

    it("should extract deprecation message", () => {
      const parserContext = parser.parseString(sampleDocComments.withDeprecated);
      const doc = extractDocComment(parserContext.docComment);

      expect(doc.deprecated).not.toBeNull();
      expect(doc.deprecated).toContain("Use newFunction instead");
    });
  });
});
