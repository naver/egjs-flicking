import { Panel } from "./type";

export const withQuoteIfString = (val: any, quote = "\"") => typeof val === "string" ? `${quote}${val}${quote}` : val;
export const getClass = (panel: Panel, attribName = "class") => panel.class ? ` ${attribName}="${panel.class}"` : "";
export const getStyle = (panel: Panel, jsx = false) => panel.style
  ? jsx
    ? ` style={{ ${Object.keys(panel.style).map(key => `${key}: ${withQuoteIfString(panel.style[key])}`).join(", ")} }}`
    : ` style="${Object.keys(panel.style).map(key => `${key}: ${panel.style[key]};`).join(" ")}"`
  : "";
export const getOptionsObject = (options: { [key: string]: any }) => `${Object.keys(options).map(key => `${key}: ${withQuoteIfString(options[key], "'")}`).join(", ")}`;
