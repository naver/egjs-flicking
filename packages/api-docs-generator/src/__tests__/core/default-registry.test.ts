import { describe, expect, it } from "vitest";
import { createDefaultRegistry } from "../../core/default-registry";

describe("createDefaultRegistry", () => {
  it("should register all standard generators", () => {
    const registry = createDefaultRegistry(".md");

    expect(registry.has("Class")).toBe(true);
    expect(registry.has("Interface")).toBe(true);
    expect(registry.has("Function")).toBe(true);
    expect(registry.has("Variable")).toBe(true);
    expect(registry.has("TypeAlias")).toBe(true);
  });

  it("should return correct directories", () => {
    const registry = createDefaultRegistry(".md");
    const dirs = registry.getDirectories();

    expect(dirs).toContain("classes");
    expect(dirs).toContain("interfaces");
    expect(dirs).toContain("functions");
    expect(dirs).toContain("variables");
    expect(dirs).toContain("types");
  });

  it("should use provided file extension", () => {
    const mdRegistry = createDefaultRegistry(".md");
    const mdxRegistry = createDefaultRegistry(".mdx");

    expect(mdRegistry.buildFilePath("Class", "Test")).toBe("classes/Test.md");
    expect(mdxRegistry.buildFilePath("Class", "Test")).toBe("classes/Test.mdx");
  });

  it("should build correct file paths for each kind", () => {
    const registry = createDefaultRegistry(".md");

    expect(registry.buildFilePath("Class", "MyClass")).toBe("classes/MyClass.md");
    expect(registry.buildFilePath("Interface", "MyInterface")).toBe("interfaces/MyInterface.md");
    expect(registry.buildFilePath("Function", "myFunction")).toBe("functions/myFunction.md");
    expect(registry.buildFilePath("Variable", "MY_CONST")).toBe("variables/MY_CONST.md");
    expect(registry.buildFilePath("TypeAlias", "MyType")).toBe("types/MyType.md");
  });
});
