import { describe, expect, it } from "vitest";
import { extractTypeString } from "../../parsers/type-info";
import { sampleExcerptTokens } from "../fixtures/excerpt-tokens";

describe("type-info parsers", () => {
  describe("extractTypeString", () => {
    it("should extract simple type string", () => {
      // In real usage, we'd extract tokens from propertyTypeTokenRange
      const tokens = sampleExcerptTokens.simpleReference.slice(1, 2);
      const typeString = extractTypeString(tokens as any);

      expect(typeString).toBe("HTMLElement");
    });

    it("should extract union type string", () => {
      // returnTypeTokenRange: startIndex: 1, endIndex: 3
      const tokens = sampleExcerptTokens.unionType.slice(1, 3);
      const typeString = extractTypeString(tokens as any);

      expect(typeString).toBe("AnchorPoint | null");
    });

    it("should extract complex type string", () => {
      // propertyTypeTokenRange: startIndex: 1, endIndex: 5
      const tokens = sampleExcerptTokens.complexType.slice(1, 5);
      const typeString = extractTypeString(tokens as any);

      expect(typeString).toBe("ValueOf<typeof ORDER>");
    });

    it("should handle function signature with parameter", () => {
      // For full signature, exclude semicolon
      const tokens = sampleExcerptTokens.withParameter.slice(0, 5);
      const typeString = extractTypeString(tokens as any);

      expect(typeString).toBe("findAnchorIncludePosition(position: number): AnchorPoint | null");
    });
  });
});
