import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateDocs } from "../adapters/markdown";

// Mock fs module
vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn()
}));

describe("generateDocs", () => {
  const mockApiJsonPath = path.join(__dirname, "../../api-artifacts/flicking.api.json");

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementations
    vi.mocked(fs.existsSync).mockReturnValue(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create output directories", () => {
    const outputDir = "/tmp/test-output";

    generateDocs({
      apiJsonPaths: [mockApiJsonPath],
      outputDir
    });

    // Should create directories for each category
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(outputDir, "classes"), {
      recursive: true
    });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(outputDir, "interfaces"), { recursive: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(outputDir, "functions"), { recursive: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(outputDir, "variables"), { recursive: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(outputDir, "types"), {
      recursive: true
    });
  });

  it("should generate files for API members", () => {
    const outputDir = "/tmp/test-output";

    generateDocs({
      apiJsonPaths: [mockApiJsonPath],
      outputDir
    });

    // Should write multiple files
    expect(fs.writeFileSync).toHaveBeenCalled();

    // Check that some expected files were written
    const writeCalls = vi.mocked(fs.writeFileSync).mock.calls;

    // Should have written index.md
    const indexCall = writeCalls.find(call => (call[0] as string).endsWith("index.md"));
    expect(indexCall).toBeDefined();
  });

  it("should return generation stats", () => {
    const outputDir = "/tmp/test-output";

    const stats = generateDocs({
      apiJsonPaths: [mockApiJsonPath],
      outputDir
    });

    expect(stats).toBeDefined();
    expect(typeof stats.classes).toBe("number");
    expect(typeof stats.interfaces).toBe("number");
    expect(typeof stats.functions).toBe("number");
    expect(typeof stats.variables).toBe("number");
    expect(typeof stats.types).toBe("number");
    expect(typeof stats.skipped).toBe("number");

    // Based on flicking.api.json structure
    expect(stats.classes).toBeGreaterThan(0);
    expect(stats.interfaces).toBeGreaterThan(0);
  });

  it("should skip directories that already exist", () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const outputDir = "/tmp/test-output";

    generateDocs({
      apiJsonPaths: [mockApiJsonPath],
      outputDir
    });

    // Should not create directories that already exist
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
});
