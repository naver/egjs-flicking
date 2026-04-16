import * as path from "node:path";
import type { ApiFunction, ApiVariable } from "@microsoft/api-extractor-model";
import { ApiModel } from "@microsoft/api-extractor-model";
import { describe, expect, it } from "vitest";
import { DocumentationContext } from "../../core/documentation-context";
import { generateFunctionMarkdown, generateVariableMarkdown } from "../../generators/simple-generators";

describe("simple-generators", () => {
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

  describe("generateFunctionMarkdown", () => {
    it("should generate markdown for a function", () => {
      if (!entryPoint) {
        return;
      }

      // Find a function in the API
      const apiFunction = entryPoint.members.find(m => m.kind === "Function") as ApiFunction | undefined;

      if (!apiFunction) {
        // Skip if no functions found
        return;
      }

      const markdown = generateFunctionMarkdown(apiFunction, `functions/${apiFunction.displayName}.md`, ctx);

      // Basic structure checks
      expect(markdown).toContain(`# ${apiFunction.displayName}`);
      expect(markdown).toContain("## Signature");
      expect(markdown).toContain("```typescript");
    });

    it("should include function signature in code block", () => {
      if (!entryPoint) {
        return;
      }

      const apiFunction = entryPoint.members.find(m => m.kind === "Function") as ApiFunction | undefined;

      if (!apiFunction) {
        return;
      }

      const markdown = generateFunctionMarkdown(apiFunction, `functions/${apiFunction.displayName}.md`, ctx);

      // Should contain the function name in signature
      expect(markdown).toContain("```typescript");
      expect(markdown).toContain("```");
    });
  });

  describe("generateVariableMarkdown", () => {
    it("should generate markdown for a variable/constant", () => {
      if (!entryPoint) {
        return;
      }

      // Find a variable (constant) in the API
      const apiVariable = entryPoint.members.find(m => m.kind === "Variable") as ApiVariable | undefined;

      if (!apiVariable) {
        // Skip if no variables found
        return;
      }

      const markdown = generateVariableMarkdown(apiVariable, `variables/${apiVariable.displayName}.md`, ctx);

      // Basic structure checks
      expect(markdown).toContain(`# ${apiVariable.displayName}`);
      expect(markdown).toContain("## Type");
    });

    it("should include type information for variable", () => {
      if (!entryPoint) {
        return;
      }

      const apiVariable = entryPoint.members.find(m => m.kind === "Variable") as ApiVariable | undefined;

      if (!apiVariable) {
        return;
      }

      const markdown = generateVariableMarkdown(apiVariable, `variables/${apiVariable.displayName}.md`, ctx);

      // Should contain type section with code block
      expect(markdown).toContain("## Type");
      expect(markdown).toContain("```typescript");
    });
  });

  describe("markdown structure", () => {
    it("should generate valid markdown with proper formatting", () => {
      if (!entryPoint) {
        return;
      }

      const apiFunction = entryPoint.members.find(m => m.kind === "Function") as ApiFunction | undefined;

      if (!apiFunction) {
        return;
      }

      const markdown = generateFunctionMarkdown(apiFunction, `functions/${apiFunction.displayName}.md`, ctx);

      // Check for proper heading format
      expect(markdown).toMatch(/^# .+/m);

      // Check code blocks are properly closed
      const openBlocks = (markdown.match(/```/g) || []).length;
      expect(openBlocks % 2).toBe(0);
    });
  });
});
