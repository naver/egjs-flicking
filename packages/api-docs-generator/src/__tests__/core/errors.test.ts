/**
 * Tests for custom error classes
 */
import { describe, expect, it } from "vitest";
import {
  DocGeneratorError,
  FileWriteError,
  GenerationError,
  isDocGeneratorError,
  TypeMismatchError
} from "../../core/errors";

describe("Custom Error Classes", () => {
  describe("DocGeneratorError", () => {
    it("should be an instance of Error", () => {
      const error = new DocGeneratorError("test error");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(DocGeneratorError);
    });

    it("should have correct name", () => {
      const error = new DocGeneratorError("test error");
      expect(error.name).toBe("DocGeneratorError");
    });

    it("should preserve message", () => {
      const error = new DocGeneratorError("test message");
      expect(error.message).toBe("test message");
    });

    it("should preserve cause when provided", () => {
      const cause = new Error("original error");
      const error = new DocGeneratorError("wrapped error", { cause });
      expect(error.cause).toBe(cause);
    });
  });

  describe("TypeMismatchError", () => {
    it("should extend DocGeneratorError", () => {
      const error = new TypeMismatchError("Class", "Interface", "TestItem");
      expect(error).toBeInstanceOf(DocGeneratorError);
      expect(error).toBeInstanceOf(TypeMismatchError);
    });

    it("should have correct name", () => {
      const error = new TypeMismatchError("Class", "Interface", "TestItem");
      expect(error.name).toBe("TypeMismatchError");
    });

    it("should format message correctly", () => {
      const error = new TypeMismatchError("Class", "Interface", "TestItem");
      expect(error.message).toContain("Class");
      expect(error.message).toContain("Interface");
      expect(error.message).toContain("TestItem");
    });

    it("should store expected and actual types", () => {
      const error = new TypeMismatchError("Class", "Interface", "TestItem");
      expect(error.expectedType).toBe("Class");
      expect(error.actualType).toBe("Interface");
      expect(error.itemName).toBe("TestItem");
    });
  });

  describe("GenerationError", () => {
    it("should extend DocGeneratorError", () => {
      const error = new GenerationError("MyClass", "Class");
      expect(error).toBeInstanceOf(DocGeneratorError);
      expect(error).toBeInstanceOf(GenerationError);
    });

    it("should have correct name", () => {
      const error = new GenerationError("MyClass", "Class");
      expect(error.name).toBe("GenerationError");
    });

    it("should format message correctly", () => {
      const error = new GenerationError("MyClass", "Class");
      expect(error.message).toContain("MyClass");
      expect(error.message).toContain("Class");
    });

    it("should store item info", () => {
      const error = new GenerationError("MyClass", "Class");
      expect(error.itemName).toBe("MyClass");
      expect(error.itemKind).toBe("Class");
    });

    it("should preserve cause", () => {
      const cause = new Error("underlying error");
      const error = new GenerationError("MyClass", "Class", cause);
      expect(error.cause).toBe(cause);
    });
  });

  describe("FileWriteError", () => {
    it("should extend DocGeneratorError", () => {
      const error = new FileWriteError("/path/to/file.md");
      expect(error).toBeInstanceOf(DocGeneratorError);
      expect(error).toBeInstanceOf(FileWriteError);
    });

    it("should have correct name", () => {
      const error = new FileWriteError("/path/to/file.md");
      expect(error.name).toBe("FileWriteError");
    });

    it("should format message correctly", () => {
      const error = new FileWriteError("/path/to/file.md");
      expect(error.message).toContain("/path/to/file.md");
    });

    it("should store file path", () => {
      const error = new FileWriteError("/path/to/file.md");
      expect(error.filePath).toBe("/path/to/file.md");
    });

    it("should preserve cause", () => {
      const cause = new Error("EACCES: permission denied");
      const error = new FileWriteError("/path/to/file.md", cause);
      expect(error.cause).toBe(cause);
    });
  });

  describe("isDocGeneratorError", () => {
    it("should return true for DocGeneratorError", () => {
      const error = new DocGeneratorError("test");
      expect(isDocGeneratorError(error)).toBe(true);
    });

    it("should return true for subclasses", () => {
      expect(isDocGeneratorError(new TypeMismatchError("A", "B", "C"))).toBe(true);
      expect(isDocGeneratorError(new GenerationError("A", "B"))).toBe(true);
      expect(isDocGeneratorError(new FileWriteError("/path"))).toBe(true);
    });

    it("should return false for regular Error", () => {
      expect(isDocGeneratorError(new Error("test"))).toBe(false);
    });

    it("should return false for non-error values", () => {
      expect(isDocGeneratorError(null)).toBe(false);
      expect(isDocGeneratorError(undefined)).toBe(false);
      expect(isDocGeneratorError("error")).toBe(false);
      expect(isDocGeneratorError({ message: "error" })).toBe(false);
    });
  });
});
