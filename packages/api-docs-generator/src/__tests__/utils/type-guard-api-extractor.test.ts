/**
 * Tests for API Extractor type guards
 */

import * as path from "node:path";
import { ApiModel } from "@microsoft/api-extractor-model";
import { describe, expect, it } from "vitest";
import {
  hasDisplayName,
  isApiClass,
  isApiFunction,
  isApiInterface,
  isApiTypeAlias,
  isApiVariable
} from "../../utils/type-guard/api-extractor";

describe("API Extractor type guards", () => {
  // Load real API model for testing
  const apiModel = new ApiModel();
  const apiJsonPath = path.resolve(__dirname, "../../../api-artifacts/flicking.api.json");
  const apiPackage = apiModel.loadPackage(apiJsonPath);
  const entryPoint = apiPackage.entryPoints[0];

  describe("isApiClass", () => {
    it("should return true for ApiClass", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();
      expect(isApiClass(classItem!)).toBe(true);
    });

    it("should return false for non-class items", () => {
      const interfaceItem = entryPoint.members.find(m => m.kind === "Interface");
      expect(interfaceItem).toBeDefined();
      expect(isApiClass(interfaceItem!)).toBe(false);
    });
  });

  describe("isApiInterface", () => {
    it("should return true for ApiInterface", () => {
      const interfaceItem = entryPoint.members.find(m => m.kind === "Interface");
      expect(interfaceItem).toBeDefined();
      expect(isApiInterface(interfaceItem!)).toBe(true);
    });

    it("should return false for non-interface items", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();
      expect(isApiInterface(classItem!)).toBe(false);
    });
  });

  describe("isApiFunction", () => {
    it("should return true for ApiFunction", () => {
      const functionItem = entryPoint.members.find(m => m.kind === "Function");
      expect(functionItem).toBeDefined();
      expect(isApiFunction(functionItem!)).toBe(true);
    });

    it("should return false for non-function items", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();
      expect(isApiFunction(classItem!)).toBe(false);
    });
  });

  describe("isApiVariable", () => {
    it("should return true for ApiVariable", () => {
      const variableItem = entryPoint.members.find(m => m.kind === "Variable");
      expect(variableItem).toBeDefined();
      expect(isApiVariable(variableItem!)).toBe(true);
    });

    it("should return false for non-variable items", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();
      expect(isApiVariable(classItem!)).toBe(false);
    });
  });

  describe("isApiTypeAlias", () => {
    it("should return true for ApiTypeAlias", () => {
      const typeAliasItem = entryPoint.members.find(m => m.kind === "TypeAlias");
      expect(typeAliasItem).toBeDefined();
      expect(isApiTypeAlias(typeAliasItem!)).toBe(true);
    });

    it("should return false for non-type-alias items", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();
      expect(isApiTypeAlias(classItem!)).toBe(false);
    });
  });

  describe("hasDisplayName", () => {
    it("should return true for items with displayName property", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();
      expect(hasDisplayName(classItem!)).toBe(true);
    });

    it("should narrow type correctly", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      expect(classItem).toBeDefined();

      if (hasDisplayName(classItem!)) {
        // TypeScript should allow accessing displayName without error
        expect(typeof classItem!.displayName).toBe("string");
        expect(classItem!.displayName.length).toBeGreaterThan(0);
      }
    });

    it("should work with all API item types that have displayName", () => {
      const classItem = entryPoint.members.find(m => m.kind === "Class");
      const interfaceItem = entryPoint.members.find(m => m.kind === "Interface");
      const functionItem = entryPoint.members.find(m => m.kind === "Function");
      const variableItem = entryPoint.members.find(m => m.kind === "Variable");
      const typeAliasItem = entryPoint.members.find(m => m.kind === "TypeAlias");

      expect(hasDisplayName(classItem!)).toBe(true);
      expect(hasDisplayName(interfaceItem!)).toBe(true);
      expect(hasDisplayName(functionItem!)).toBe(true);
      expect(hasDisplayName(variableItem!)).toBe(true);
      expect(hasDisplayName(typeAliasItem!)).toBe(true);
    });
  });
});
