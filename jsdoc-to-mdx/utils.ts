import Identifier from "./types/identifier";

export const isInternal = (data: Identifier) => data.customTags && data.customTags.some(val => val.tag === "internal");
