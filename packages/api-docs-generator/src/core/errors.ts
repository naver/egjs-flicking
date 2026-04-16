/**
 * Custom error classes for the documentation generator.
 * These provide structured error handling with specific error types
 * for different failure scenarios.
 */

/**
 * Base error class for all documentation generator errors.
 * Extends the built-in Error class with proper prototype chain support.
 */
export class DocGeneratorError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "DocGeneratorError";
    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error thrown when an API item type doesn't match the expected type.
 * This typically occurs when the registry dispatches to a wrong generator.
 */
export class TypeMismatchError extends DocGeneratorError {
  public readonly expectedType: string;
  public readonly actualType: string;
  public readonly itemName: string;

  constructor(expectedType: string, actualType: string, itemName: string) {
    super(`Type mismatch for "${itemName}": expected ${expectedType} but got ${actualType}`);
    this.name = "TypeMismatchError";
    this.expectedType = expectedType;
    this.actualType = actualType;
    this.itemName = itemName;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error thrown when documentation generation fails for a specific item.
 * Contains information about which item failed and the underlying cause.
 */
export class GenerationError extends DocGeneratorError {
  public readonly itemName: string;
  public readonly itemKind: string;

  constructor(itemName: string, itemKind: string, cause?: Error) {
    super(`Failed to generate documentation for ${itemKind} "${itemName}"`, {
      cause
    });
    this.name = "GenerationError";
    this.itemName = itemName;
    this.itemKind = itemKind;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error thrown when file write operations fail.
 * Contains the file path and underlying cause.
 */
export class FileWriteError extends DocGeneratorError {
  public readonly filePath: string;

  constructor(filePath: string, cause?: Error) {
    super(`Failed to write file: ${filePath}`, { cause });
    this.name = "FileWriteError";
    this.filePath = filePath;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Type guard to check if an unknown value is a DocGeneratorError.
 * Useful for error handling in catch blocks.
 */
export function isDocGeneratorError(error: unknown): error is DocGeneratorError {
  return error instanceof DocGeneratorError;
}

/**
 * Format an error for logging with full details.
 * Includes the error type, message, and cause chain if present.
 */
export function formatErrorForLogging(error: unknown): string {
  if (!(error instanceof Error)) {
    return `Unknown error: ${String(error)}`;
  }

  const lines: string[] = [];
  lines.push(`[${error.name}] ${error.message}`);

  // Add specific details for our custom errors
  if (error instanceof TypeMismatchError) {
    lines.push(`  Expected: ${error.expectedType}`);
    lines.push(`  Actual: ${error.actualType}`);
    lines.push(`  Item: ${error.itemName}`);
  } else if (error instanceof GenerationError) {
    lines.push(`  Item: ${error.itemName}`);
    lines.push(`  Kind: ${error.itemKind}`);
  } else if (error instanceof FileWriteError) {
    lines.push(`  File: ${error.filePath}`);
  }

  // Include cause chain
  if (error.cause instanceof Error) {
    lines.push(`  Caused by: ${formatErrorForLogging(error.cause)}`);
  }

  return lines.join("\n");
}
