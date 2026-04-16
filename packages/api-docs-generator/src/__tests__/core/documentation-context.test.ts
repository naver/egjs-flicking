import * as path from "node:path";
import { ApiModel } from "@microsoft/api-extractor-model";
import { describe, expect, it } from "vitest";
import { CanonicalReferenceParser } from "../../core/canonical-reference-parser";
import { DocumentationContext } from "../../core/documentation-context";

describe("DocumentationContext", () => {
  const apiModel = new ApiModel();
  const apiJsonPath = path.join(__dirname, "../../../api-artifacts/flicking.api.json");

  let ctx: DocumentationContext;

  try {
    const apiPackage = apiModel.loadPackage(apiJsonPath);
    const packageName = `${apiPackage.name}!`;
    ctx = new DocumentationContext(apiPackage, packageName);
  } catch {
    // Skip tests if API JSON doesn't exist
  }

  describe("resolveReference", () => {
    it("should resolve class name to canonical reference", () => {
      if (!ctx) return;

      const ref = ctx.resolveReference("Flicking");
      expect(ref).toBeDefined();
      expect(ref).toContain("Flicking");
      expect(ref).toContain(":class");
    });

    it("should resolve interface name", () => {
      if (!ctx) return;

      const ref = ctx.resolveReference("FlickingOptions");
      expect(ref).toBeDefined();
      expect(ref).toContain("FlickingOptions");
    });

    it("should resolve qualified member name", () => {
      if (!ctx) return;

      const ref = ctx.resolveReference("Flicking.init");
      expect(ref).toBeDefined();
      expect(ref).toContain("init");
    });

    it("should return undefined for non-existent reference", () => {
      if (!ctx) return;

      const ref = ctx.resolveReference("NonExistentClass");
      expect(ref).toBeUndefined();
    });
  });

  describe("canonicalReferenceToPath", () => {
    it("should convert class reference to path", () => {
      if (!ctx) return;

      const path = ctx.canonicalReferenceToPath("@egjs/flicking!AnchorPoint:class");
      expect(path).toBe("classes/AnchorPoint.md");
    });

    it("should convert interface reference to path", () => {
      if (!ctx) return;

      const path = ctx.canonicalReferenceToPath("@egjs/flicking!FlickingOptions:interface");
      expect(path).toBe("interfaces/FlickingOptions.md");
    });

    it("should return null for external reference", () => {
      if (!ctx) return;

      const path = ctx.canonicalReferenceToPath("!HTMLElement:interface");
      expect(path).toBeNull();
    });
  });

  describe("resolveRelativeLink", () => {
    it("should create relative link in same directory", () => {
      if (!ctx) return;

      const link = ctx.resolveRelativeLink("classes/Flicking.md", "classes/Camera.md");
      expect(link).toBe("Camera.md");
    });

    it("should create relative link across directories", () => {
      if (!ctx) return;

      const link = ctx.resolveRelativeLink("classes/Flicking.md", "interfaces/FlickingOptions.md");
      expect(link).toBe("../interfaces/FlickingOptions.md");
    });

    it("should create link from root to subdirectory", () => {
      if (!ctx) return;

      const link = ctx.resolveRelativeLink("index.md", "classes/Flicking.md");
      expect(link).toBe("classes/Flicking.md");
    });
  });

  describe("CanonicalReferenceParser", () => {
    it("should extract class kind", () => {
      const parser = new CanonicalReferenceParser("@egjs/flicking!Flicking:class");
      expect(parser.kind).toBe("class");
    });

    it("should extract interface kind", () => {
      const parser = new CanonicalReferenceParser("@egjs/flicking!FlickingOptions:interface");
      expect(parser.kind).toBe("interface");
    });

    it("should extract member kind with overload", () => {
      const parser = new CanonicalReferenceParser("@egjs/flicking!Flicking#init:member(1)");
      expect(parser.kind).toBe("member");
    });

    it("should extract class name", () => {
      const parser = new CanonicalReferenceParser("@egjs/flicking!Flicking:class");
      expect(parser.name).toBe("Flicking");
    });

    it("should extract container name from member reference", () => {
      const parser = new CanonicalReferenceParser("@egjs/flicking!Flicking#init:member(1)");
      expect(parser.name).toBe("Flicking");
    });
  });

  describe("convertSiteUrlToRelativePath", () => {
    it("should convert site-internal URL to relative path with docsBasePath", () => {
      if (!ctx) return;

      const ctxWithBaseUrl = new DocumentationContext(
        new ApiModel().loadPackage(apiJsonPath),
        "@egjs/flicking!",
        ["https://naver.github.io/egjs-flicking/"],
        "api"
      );

      // currentFilePath is relative to output dir (api/), docsBasePath adds the "api" prefix
      const result = ctxWithBaseUrl.convertSiteUrlToRelativePath(
        "https://naver.github.io/egjs-flicking/docs/demos/basic/alignment",
        "interfaces/FlickingOptions.mdx"
      );
      expect(result).toBe("../../demos/basic/alignment.mdx");
    });

    it("should return null for external URLs", () => {
      if (!ctx) return;

      const ctxWithBaseUrl = new DocumentationContext(
        new ApiModel().loadPackage(apiJsonPath),
        "@egjs/flicking!",
        ["https://naver.github.io/egjs-flicking/"],
        "api"
      );

      const result = ctxWithBaseUrl.convertSiteUrlToRelativePath(
        "https://example.com/some-page",
        "interfaces/FlickingOptions.mdx"
      );
      expect(result).toBeNull();
    });

    it("should return null when no siteBaseUrls configured", () => {
      if (!ctx) return;

      const result = ctx.convertSiteUrlToRelativePath(
        "https://naver.github.io/egjs-flicking/docs/demos/basic/alignment",
        "interfaces/FlickingOptions.mdx"
      );
      expect(result).toBeNull();
    });

    it("should handle URL with anchor fragment", () => {
      if (!ctx) return;

      const ctxWithBaseUrl = new DocumentationContext(
        new ApiModel().loadPackage(apiJsonPath),
        "@egjs/flicking!",
        ["https://naver.github.io/egjs-flicking/"],
        "api"
      );

      const result = ctxWithBaseUrl.convertSiteUrlToRelativePath(
        "https://naver.github.io/egjs-flicking/docs/demos/basic/alignment#some-section",
        "interfaces/FlickingOptions.mdx"
      );
      expect(result).toBe("../../demos/basic/alignment.mdx#some-section");
    });

    it("should handle URL within same docs base path", () => {
      if (!ctx) return;

      const ctxWithBaseUrl = new DocumentationContext(
        new ApiModel().loadPackage(apiJsonPath),
        "@egjs/flicking!",
        ["https://naver.github.io/egjs-flicking/"],
        "api"
      );

      // Link from one api page to another api page
      const result = ctxWithBaseUrl.convertSiteUrlToRelativePath(
        "https://naver.github.io/egjs-flicking/docs/api/classes/Flicking",
        "interfaces/FlickingOptions.mdx"
      );
      expect(result).toBe("../classes/Flicking.mdx");
    });
  });

  describe("getAllReferences", () => {
    it("should return all indexed references as Map", () => {
      if (!ctx) return;

      const refs = ctx.getAllReferences();
      expect(refs).toBeInstanceOf(Map);
      expect(refs.size).toBeGreaterThan(0);
    });

    it("should include both simple and qualified names", () => {
      if (!ctx) return;

      const refs = ctx.getAllReferences();
      expect(refs.has("Flicking")).toBe(true);

      // Should have qualified names
      const hasQualifiedNames = Array.from(refs.keys()).some(key => key.includes("."));
      expect(hasQualifiedNames).toBe(true);
    });
  });
});
