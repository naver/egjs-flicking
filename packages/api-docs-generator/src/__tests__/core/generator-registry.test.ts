import type { ApiItem } from "@microsoft/api-extractor-model";
import { describe, expect, it, vi } from "vitest";
import { type GeneratorConfig, type GeneratorContext, GeneratorRegistry } from "../../core/generator-registry";

describe("GeneratorRegistry", () => {
  describe("register", () => {
    it("should register a generator for a specific kind", () => {
      const registry = new GeneratorRegistry();
      const mockGenerator: GeneratorConfig = {
        kind: "Class",
        directory: "classes",
        extension: ".md",
        generate: vi.fn().mockReturnValue("# Test")
      };

      registry.register(mockGenerator);

      expect(registry.has("Class")).toBe(true);
    });

    it("should throw error when registering duplicate kind", () => {
      const registry = new GeneratorRegistry();
      const mockGenerator: GeneratorConfig = {
        kind: "Class",
        directory: "classes",
        extension: ".md",
        generate: vi.fn()
      };

      registry.register(mockGenerator);

      expect(() => registry.register(mockGenerator)).toThrow("Generator for kind 'Class' is already registered");
    });
  });

  describe("get", () => {
    it("should return registered generator", () => {
      const registry = new GeneratorRegistry();
      const mockGenerator: GeneratorConfig = {
        kind: "Interface",
        directory: "interfaces",
        extension: ".md",
        generate: vi.fn()
      };

      registry.register(mockGenerator);
      const result = registry.get("Interface");

      expect(result).toBe(mockGenerator);
    });

    it("should return undefined for unregistered kind", () => {
      const registry = new GeneratorRegistry();

      expect(registry.get("Unknown")).toBeUndefined();
    });
  });

  describe("has", () => {
    it("should return true for registered kind", () => {
      const registry = new GeneratorRegistry();
      registry.register({
        kind: "Function",
        directory: "functions",
        extension: ".md",
        generate: vi.fn()
      });

      expect(registry.has("Function")).toBe(true);
    });

    it("should return false for unregistered kind", () => {
      const registry = new GeneratorRegistry();

      expect(registry.has("Function")).toBe(false);
    });
  });

  describe("getSupportedKinds", () => {
    it("should return all registered kinds", () => {
      const registry = new GeneratorRegistry();
      registry.register({
        kind: "Class",
        directory: "classes",
        extension: ".md",
        generate: vi.fn()
      });
      registry.register({
        kind: "Interface",
        directory: "interfaces",
        extension: ".md",
        generate: vi.fn()
      });

      const kinds = registry.getSupportedKinds();

      expect(kinds).toEqual(["Class", "Interface"]);
    });
  });

  describe("getDirectories", () => {
    it("should return all unique directories", () => {
      const registry = new GeneratorRegistry();
      registry.register({
        kind: "Class",
        directory: "classes",
        extension: ".md",
        generate: vi.fn()
      });
      registry.register({
        kind: "Interface",
        directory: "interfaces",
        extension: ".md",
        generate: vi.fn()
      });

      const dirs = registry.getDirectories();

      expect(dirs).toContain("classes");
      expect(dirs).toContain("interfaces");
    });
  });

  describe("generateFor", () => {
    it("should generate content using registered generator", () => {
      const registry = new GeneratorRegistry();
      const generateFn = vi.fn().mockReturnValue("# Generated Content");

      registry.register({
        kind: "Class",
        directory: "classes",
        extension: ".md",
        generate: generateFn
      });

      const mockMember = {
        kind: "Class",
        displayName: "TestClass"
      } as unknown as ApiItem;

      const mockContext: GeneratorContext = {
        currentFilePath: "classes/TestClass.md",
        documentationContext: {} as any
      };

      const result = registry.generateFor(mockMember, mockContext);

      expect(result).not.toBeNull();
      expect(result?.content).toBe("# Generated Content");
      expect(result?.filePath).toBe("classes/TestClass.md");
      expect(result?.category).toBe("classes");
      expect(generateFn).toHaveBeenCalledWith(mockMember, mockContext);
    });

    it("should return null for unsupported kind", () => {
      const registry = new GeneratorRegistry();

      const mockMember = {
        kind: "Unknown",
        displayName: "Test"
      } as unknown as ApiItem;

      const mockContext: GeneratorContext = {
        currentFilePath: "test.md",
        documentationContext: {} as any
      };

      const result = registry.generateFor(mockMember, mockContext);

      expect(result).toBeNull();
    });
  });

  describe("buildFilePath", () => {
    it("should build file path with directory and extension", () => {
      const registry = new GeneratorRegistry();
      registry.register({
        kind: "Class",
        directory: "classes",
        extension: ".md",
        generate: vi.fn()
      });

      const path = registry.buildFilePath("Class", "MyClass");

      expect(path).toBe("classes/MyClass.md");
    });

    it("should return null for unregistered kind", () => {
      const registry = new GeneratorRegistry();

      const path = registry.buildFilePath("Unknown", "Test");

      expect(path).toBeNull();
    });
  });
});

describe("GeneratorRegistry with custom path resolver", () => {
  it("should use custom path resolver when provided", () => {
    const registry = new GeneratorRegistry();
    const customPathResolver = vi.fn().mockReturnValue("custom/path/MyClass.mdx");

    registry.register({
      kind: "Class",
      directory: "classes",
      extension: ".md",
      generate: vi.fn().mockReturnValue("# Content"),
      pathResolver: customPathResolver
    });

    const mockMember = {
      kind: "Class",
      displayName: "MyClass"
    } as unknown as ApiItem;

    const mockContext: GeneratorContext = {
      currentFilePath: "classes/MyClass.md",
      documentationContext: {} as any
    };

    const result = registry.generateFor(mockMember, mockContext);

    expect(customPathResolver).toHaveBeenCalledWith("MyClass", "classes", ".md");
    expect(result?.filePath).toBe("custom/path/MyClass.mdx");
  });
});
