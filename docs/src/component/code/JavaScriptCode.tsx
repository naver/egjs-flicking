import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getStyle, withQuoteIfString } from "./utils";

export default ({ options, panels, plugins = [], siblings = [], imports = [] }: SourceContext) => {
  const getOptions = (opts: { [key: string]: any }) => `${Object.keys(opts).map(key => `${key}: ${withQuoteIfString(opts[key])}`).join(",\n  ")}`;

  const createVanillaFlicking = options
    ? `const flicking = new Flicking("#flick", {
  ${getOptions(options)}
});`
    : "const flicking = new Flicking(\"#flick\")";

  const addPlugins = plugins
    ? `\n\nflicking.addPlugins(${plugins.map(plugin => `new ${plugin[0]}(${plugin[1] ? `{\n  ${getOptions(plugin[1])}\n}` : ""})`)});` : "";
  const allImports = [...plugins.map(plugin => [`{ ${plugin[0]} }`, "@egjs/flicking-plugins"]), ...imports];

  const slots = panels.filter(panel => panel.isSlot);

  return <><CodeBlock className="html" title="html">
    {`<div id="flick" class="flicking-viewport${options.horizontal === false ? " vertical" : "" }">
  <div class="flicking-camera">
    ${panels.filter(panel => !panel.isSlot).map(panel => `<${panel.tag}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n    ")}
  </div>${slots.length ? `\n  ${slots.map(slot => `<${slot.tag}${getClass(slot)}${getStyle(slot)}>${slot.content}</${slot.tag}>`).join("\n  ")}` : ""}
</div>${siblings ? "\n" + siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n") : ""}`}
  </CodeBlock>
  <CodeBlock className="js" title="js">
    {`${getImports(allImports)}\n\n${createVanillaFlicking}${addPlugins}`}
  </CodeBlock></>;
};
