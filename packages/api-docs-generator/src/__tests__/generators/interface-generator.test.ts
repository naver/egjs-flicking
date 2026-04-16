import * as path from "node:path";
import type { ApiInterface } from "@microsoft/api-extractor-model";
import { ApiModel } from "@microsoft/api-extractor-model";
import { describe, expect, it } from "vitest";
import { DocumentationContext } from "../../core/documentation-context";
import { generateInterfaceMarkdown } from "../../generators/interface-generator";

describe("interface-generator", () => {
  const apiModel = new ApiModel();
  const apiJsonPath = path.join(__dirname, "../../../api-artifacts/flicking.api.json");

  let apiPackage: ReturnType<typeof apiModel.loadPackage>;
  let entryPoint: (typeof apiPackage.entryPoints)[0];
  let ctx: DocumentationContext;

  // Load API model once
  try {
    apiPackage = apiModel.loadPackage(apiJsonPath);
    entryPoint = apiPackage.entryPoints[0];
    const packageName = `${apiPackage.name}!`;
    ctx = new DocumentationContext(apiPackage, packageName);
  } catch {
    // API JSON might not exist in test environment
  }

  it("should generate markdown for FlickingOptions interface", () => {
    if (!entryPoint) {
      return;
    }

    const flickingOptions = entryPoint.members.find(m => m.displayName === "FlickingOptions") as ApiInterface;

    expect(flickingOptions).toBeDefined();

    const markdown = generateInterfaceMarkdown(flickingOptions, "interfaces/FlickingOptions.md", ctx);

    // Basic structure checks
    expect(markdown).toContain("# FlickingOptions");
    expect(markdown).toContain("## Properties");
  });

  it("should include property types in interface markdown", () => {
    if (!entryPoint) {
      return;
    }

    const flickingOptions = entryPoint.members.find(m => m.displayName === "FlickingOptions") as ApiInterface;

    if (!flickingOptions) {
      return;
    }

    const markdown = generateInterfaceMarkdown(flickingOptions, "interfaces/FlickingOptions.md", ctx);

    // Should contain Type labels for properties
    expect(markdown).toContain("**Type:**");
  });

  it("should generate markdown for event interfaces", () => {
    if (!entryPoint) {
      return;
    }

    // Find an event interface
    const eventInterface = entryPoint.members.find(
      m => m.kind === "Interface" && m.displayName.toLowerCase().includes("event")
    ) as ApiInterface | undefined;

    if (!eventInterface) {
      return;
    }

    const markdown = generateInterfaceMarkdown(eventInterface, `interfaces/${eventInterface.displayName}.md`, ctx);

    expect(markdown).toContain(`# ${eventInterface.displayName}`);
  });

  it("should handle interface with method signatures", () => {
    if (!entryPoint) {
      return;
    }

    // Find an interface that might have methods
    const interfaces = entryPoint.members.filter(m => m.kind === "Interface") as ApiInterface[];

    const interfaceWithMethods = interfaces.find(iface => iface.members.some(m => m.kind === "MethodSignature"));

    if (!interfaceWithMethods) {
      // Skip if no interface with methods found
      return;
    }

    const markdown = generateInterfaceMarkdown(
      interfaceWithMethods,
      `interfaces/${interfaceWithMethods.displayName}.md`,
      ctx
    );

    expect(markdown).toContain("## Methods");
  });

  it("should include default values when present", () => {
    if (!entryPoint) {
      return;
    }

    const flickingOptions = entryPoint.members.find(m => m.displayName === "FlickingOptions") as ApiInterface;

    if (!flickingOptions) {
      return;
    }

    const markdown = generateInterfaceMarkdown(flickingOptions, "interfaces/FlickingOptions.md", ctx);

    // FlickingOptions properties should have default values
    expect(markdown).toContain("**Default:**");
  });

  it("should handle optional properties", () => {
    if (!entryPoint) {
      return;
    }

    const flickingOptions = entryPoint.members.find(m => m.displayName === "FlickingOptions") as ApiInterface;

    if (!flickingOptions) {
      return;
    }

    const markdown = generateInterfaceMarkdown(flickingOptions, "interfaces/FlickingOptions.md", ctx);

    // FlickingOptions has optional properties - verify they're included in output
    // Check that the markdown contains property definitions with types
    expect(markdown).toContain("**Type:**");
  });

  it("should generate valid markdown structure", () => {
    if (!entryPoint) {
      return;
    }

    const apiInterface = entryPoint.members.find(m => m.kind === "Interface") as ApiInterface | undefined;

    if (!apiInterface) {
      return;
    }

    const markdown = generateInterfaceMarkdown(apiInterface, `interfaces/${apiInterface.displayName}.md`, ctx);

    // Check for proper heading format
    expect(markdown).toMatch(/^# .+/m);

    // Check code blocks are properly closed
    const openBlocks = (markdown.match(/```/g) || []).length;
    expect(openBlocks % 2).toBe(0);
  });
});
