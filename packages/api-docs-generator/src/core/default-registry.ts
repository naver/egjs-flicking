import type { ApiItem } from "@microsoft/api-extractor-model";
import { generateClassMarkdown } from "../generators/class-generator";
import { generateInterfaceMarkdown } from "../generators/interface-generator";
import {
  generateFunctionMarkdown,
  generateTypeAliasMarkdown,
  generateVariableMarkdown
} from "../generators/simple-generators";
import {
  getDisplayName,
  isApiClass,
  isApiFunction,
  isApiInterface,
  isApiTypeAlias,
  isApiVariable
} from "../utils/type-guard/api-extractor";
import { TypeMismatchError } from "./errors";
import type { GeneratorContext } from "./generator-registry";
import { GeneratorRegistry } from "./generator-registry";

/**
 * Directory configuration for each API kind
 */
export const KIND_DIRECTORIES = {
  Class: "classes",
  Interface: "interfaces",
  Function: "functions",
  Variable: "variables",
  TypeAlias: "types"
} as const;

/**
 * Create a GeneratorRegistry with all standard generators registered
 * @param extension File extension to use (e.g., ".md" or ".mdx")
 */
export function createDefaultRegistry(extension: string): GeneratorRegistry {
  const registry = new GeneratorRegistry();

  // Class generator
  registry.register({
    kind: "Class",
    directory: KIND_DIRECTORIES.Class,
    extension,
    generate: (member: ApiItem, context: GeneratorContext) => {
      if (!isApiClass(member)) {
        throw new TypeMismatchError("Class", member.kind, getDisplayName(member));
      }
      const optionsInterface = context.inlineOptionsInterfaces?.get(member.displayName);
      return generateClassMarkdown(member, context.currentFilePath, context.documentationContext, optionsInterface);
    }
  });

  // Interface generator
  registry.register({
    kind: "Interface",
    directory: KIND_DIRECTORIES.Interface,
    extension,
    generate: (member: ApiItem, context: GeneratorContext) => {
      if (!isApiInterface(member)) {
        throw new TypeMismatchError("Interface", member.kind, getDisplayName(member));
      }
      return generateInterfaceMarkdown(member, context.currentFilePath, context.documentationContext);
    }
  });

  // Function generator
  registry.register({
    kind: "Function",
    directory: KIND_DIRECTORIES.Function,
    extension,
    generate: (member: ApiItem, context: GeneratorContext) => {
      if (!isApiFunction(member)) {
        throw new TypeMismatchError("Function", member.kind, getDisplayName(member));
      }
      return generateFunctionMarkdown(member, context.currentFilePath, context.documentationContext);
    }
  });

  // Variable generator
  registry.register({
    kind: "Variable",
    directory: KIND_DIRECTORIES.Variable,
    extension,
    generate: (member: ApiItem, context: GeneratorContext) => {
      if (!isApiVariable(member)) {
        throw new TypeMismatchError("Variable", member.kind, getDisplayName(member));
      }
      return generateVariableMarkdown(member, context.currentFilePath, context.documentationContext);
    }
  });

  // TypeAlias generator
  registry.register({
    kind: "TypeAlias",
    directory: KIND_DIRECTORIES.TypeAlias,
    extension,
    generate: (member: ApiItem, context: GeneratorContext) => {
      if (!isApiTypeAlias(member)) {
        throw new TypeMismatchError("TypeAlias", member.kind, getDisplayName(member));
      }
      return generateTypeAliasMarkdown(member, context.currentFilePath, context.documentationContext);
    }
  });

  return registry;
}
