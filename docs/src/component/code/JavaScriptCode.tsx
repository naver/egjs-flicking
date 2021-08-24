import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getStyle, withQuoteIfString } from "./utils";

export default ({ options, panels, events = {}, methods = {}, plugins = [], siblings = [], imports = [] }: SourceContext) => {
  const getOptions = (opts: { [key: string]: any }) => `${Object.keys(opts).map(key => `${key}: ${withQuoteIfString(opts[key])}`).join(",\n  ")}`;

  const declareVars = Object.keys(methods).map(name => `const ${name} = ${methods[name]};\n`).join("");

  const createVanillaFlicking = options
    ? `const flicking = new Flicking("#flick", {
  ${getOptions(options)}
});\n\n`
    : "const flicking = new Flicking(\"#flick\")";

  const addPlugins = plugins.length > 0
    ? `flicking.addPlugins(${plugins.map(plugin => `new ${plugin[0]}(${plugin[1] ? `{\n  ${getOptions(plugin[1])}\n}` : ""})`)});` : "";
  const allImports = [...plugins.map(plugin => [`{ ${plugin[0]} }`, "@egjs/flicking-plugins"]), ...imports];
  const addEvents = Object.keys(events).map(evt => {
    const callback = events[evt];
    return `flicking.on("${evt}", ${callback})\n`;
  }).join("");

  const slots = panels.filter(panel => panel.isSlot);

  return <><CodeBlock className="html" title="html">
    {`<div id="flick" class="flicking-viewport${options.horizontal === false ? " vertical" : "" }">
  <div class="flicking-camera">
    ${panels.filter(panel => !panel.isSlot).map(panel => `<${panel.tag}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n    ")}
  </div>${slots.length ? `\n  ${slots.map(slot => `<${slot.tag}${getClass(slot)}${getStyle(slot)}>${slot.content}</${slot.tag}>`).join("\n  ")}` : ""}
</div>${siblings ? "\n" + siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n") : ""}`}
  </CodeBlock>
  <CodeBlock className="js" title="js">
    {`${getImports(allImports)}\n\n${declareVars}${createVanillaFlicking}${addPlugins}${addEvents}`.trim()}
  </CodeBlock></>;
};
