import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getOptionsObject, getPlugins, getStyle } from "./utils";

export default ({ options, panels, plugins, siblings, imports = [] }: SourceContext) => {
  const optionsObject = getOptionsObject(options);
  const declarePlugins = plugins ? `\n\nconst plugins = [${getPlugins(plugins)}];` : "";
  const slots = panels.filter(panel => panel.isSlot);

  const defaultImports: Array<string | string[]> = [
    ["Flicking, { FlickingPanel }", "@egjs/svelte-flicking"]
  ];

  if (plugins) {
    defaultImports.push([`{ ${plugins.map(plugin => plugin[0])} }`, "@egjs/flicking-plugins"]);
  }

  defaultImports.push(...imports);

  const slotsTemplate = slots.length
    ? `
  <svelte:fragment slot="viewport">
    ${slots.map(slot => `<${slot.tag}${getClass(slot)}${getStyle(slot, true)}>${slot.content}</${slot.tag}>`).join("\n    ")}
  </svelte:fragment>`
    : "";

  return <CodeBlock className="jsx" title="DemoComponent.jsx">
    {`<script lang="ts">
${getImports(defaultImports, { includeFlicking: false })}${declarePlugins}
</script>

<Flicking${options ? ` options={{ ${optionsObject} }}` : ""}${plugins ? " plugins={plugins}" : ""}>
  ${panels.filter(panel => !panel.isSlot).map(panel => `<FlickingPanel${getClass(panel)}${getStyle(panel)}>${panel.content}</FlickingPanel>`).join("\n  ")}${slotsTemplate}
</Flicking>${siblings ? `\n${siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n")}` : ""}`}
  </CodeBlock>;
};
