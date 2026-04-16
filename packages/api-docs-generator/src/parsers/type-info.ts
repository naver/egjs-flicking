import type { ExcerptToken } from "@microsoft/api-extractor-model";

/**
 * Extract type string from excerpt tokens
 * This converts the token array back into a readable type string
 */
export function extractTypeString(excerptTokens: readonly ExcerptToken[]): string {
  let result = "";

  for (const token of excerptTokens) {
    // Skip the trailing semicolon
    if (token.text === ";") {
      continue;
    }

    result += token.text;
  }

  return result.trim();
}
