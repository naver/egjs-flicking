import { InnerElement } from "./type";

export const withQuoteIfString = (val: any, quote = "\"") => typeof val === "string" ? `${quote}${val}${quote}` : val;
export const getClass = (panel: InnerElement, attribName = "class") => panel.class ? ` ${attribName}="${panel.class}"` : "";
export const getStyle = (panel: InnerElement, jsx = false) => panel.style
  ? jsx
    ? ` style={{ ${Object.keys(panel.style).map(key => `${key}: ${withQuoteIfString(panel.style[key])}`).join(", ")} }}`
    : ` style="${Object.keys(panel.style).map(key => `${key}: ${panel.style[key]};`).join(" ")}"`
  : "";
export const getOptionsObject = (options: { [key: string]: any }) => `${Object.keys(options).map(key => `${key}: ${withQuoteIfString(options[key], "'")}`).join(", ")}`;
export const getImports = (otherImports, {
  prefix,
  includeFlicking = true
}: Partial<{
  prefix?: string;
  includeFlicking: boolean;
}> = {}) => {
  const imports = includeFlicking
    ? [["Flicking", `@egjs/${prefix ? `${prefix}-` : ""}flicking`]]
    : [];

  if (otherImports) {
    imports.push(...otherImports);
  }

  return `${imports.map(imp => Array.isArray(imp) ? `import ${imp[0]} from "${imp[1]}";` : `import "${imp}";`).join("\n")}`;
};
export const getPlugins = (plugins) => `${plugins.map(plugin => `new ${plugin[0]}(${typeof plugin[1] === "object" ? `{ ${getOptionsObject(plugin[1])} }` : plugin[1] ?? ""}`).join(", ")})`;
