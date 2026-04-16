import * as path from "node:path";
import type { ApiClass } from "@microsoft/api-extractor-model";
import { ApiModel } from "@microsoft/api-extractor-model";
import { describe, expect, it } from "vitest";
import { DocumentationContext } from "../../core/documentation-context";
import { generateClassMarkdown } from "../../generators/class-generator";

describe("class-generator", () => {
  it("should generate markdown for AnchorPoint class", () => {
    const apiModel = new ApiModel();
    const apiJsonPath = path.join(__dirname, "../../../api-artifacts/flicking.api.json");

    const apiPackage = apiModel.loadPackage(apiJsonPath);
    const entryPoint = apiPackage.entryPoints[0];
    const packageName = `${apiPackage.name}!`;
    const ctx = new DocumentationContext(apiPackage, packageName);

    const anchorPointClass = entryPoint.members.find(m => m.displayName === "AnchorPoint") as ApiClass;

    expect(anchorPointClass).toBeDefined();

    const markdown = generateClassMarkdown(anchorPointClass, "classes/AnchorPoint.md", ctx);

    console.log("\n=== Generated Markdown ===");
    console.log(markdown);
    console.log("=== End ===\n");

    // Basic structure checks
    expect(markdown).toContain("# AnchorPoint");
    expect(markdown).toContain("## Constructor");
    expect(markdown).toContain("## Properties");
  });

  it("should generate markdown for Camera class with methods", () => {
    const apiModel = new ApiModel();
    const apiJsonPath = path.join(__dirname, "../../../api-artifacts/flicking.api.json");

    const apiPackage = apiModel.loadPackage(apiJsonPath);
    const entryPoint = apiPackage.entryPoints[0];
    const packageName = `${apiPackage.name}!`;
    const ctx = new DocumentationContext(apiPackage, packageName);

    const cameraClass = entryPoint.members.find(m => m.displayName === "Camera") as ApiClass;

    expect(cameraClass).toBeDefined();

    const markdown = generateClassMarkdown(cameraClass, "classes/Camera.md", ctx);

    console.log("\n=== Camera Class Markdown ===");
    console.log(markdown.substring(0, 1500)); // First 1500 chars
    console.log("...(truncated)");
    console.log("=== End ===\n");

    // Basic structure checks
    expect(markdown).toContain("# Camera");
    expect(markdown).toContain("## Properties");
    expect(markdown).toContain("## Methods");
  });
});
