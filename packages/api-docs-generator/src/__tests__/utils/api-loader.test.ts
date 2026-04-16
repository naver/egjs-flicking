/**
 * Tests for shared API loader utilities
 */
import * as path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { createEmptyStats, type GenerationStats, loadApiPackage, printStats } from "../../utils/api-loader";

describe("Shared API Loader Utilities", () => {
  describe("loadApiPackage", () => {
    it("should load and return API package with entry point", () => {
      const apiJsonPath = path.resolve(__dirname, "../../../api-artifacts/flicking.api.json");

      const result = loadApiPackage(apiJsonPath);

      expect(result.apiPackage).toBeDefined();
      expect(result.entryPoint).toBeDefined();
      expect(result.entryPoint.members.length).toBeGreaterThan(0);
    });
  });

  describe("createEmptyStats", () => {
    it("should return stats object with all zeros", () => {
      const stats = createEmptyStats();

      expect(stats.classes).toBe(0);
      expect(stats.interfaces).toBe(0);
      expect(stats.functions).toBe(0);
      expect(stats.variables).toBe(0);
      expect(stats.types).toBe(0);
      expect(stats.skipped).toBe(0);
    });
  });

  describe("printStats", () => {
    it("should log stats to console", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const stats: GenerationStats = {
        classes: 10,
        interfaces: 20,
        functions: 30,
        variables: 5,
        types: 3,
        skipped: 2
      };

      printStats(stats, "/output/dir");

      expect(consoleSpy).toHaveBeenCalled();
      // Check that key info is logged
      const allCalls = consoleSpy.mock.calls.flat().join(" ");
      expect(allCalls).toContain("10");
      expect(allCalls).toContain("20");
      expect(allCalls).toContain("30");
      expect(allCalls).toContain("/output/dir");

      consoleSpy.mockRestore();
    });
  });
});
