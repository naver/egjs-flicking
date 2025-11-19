import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getOptionsObject, getPlugins, getStyle } from "./utils";

export default ({ options, panels, events = {}, methods = {}, plugins, siblings = [], imports = [], viewportClass="" }: SourceContext) => {
  const optionsObject = getOptionsObject(options);
  const slots = panels.filter(panel => panel.isSlot);
  const declarePlugins = plugins ? `,
  data() {
    return {
      plugins: [${getPlugins(plugins)}]
    }
  }` : "";

  const slotsTemplate = slots.length
    ? `
  <template #viewport>
    ${slots.map(slot => `<${slot.tag}${getClass(slot)}${getStyle(slot)}>${slot.content}</${slot.tag}>`).join("\n    ")}
  </template>`
    : "";
  const allImports = [...(plugins ?? []).map(plugin => [`{ ${plugin[0]} }`, "@egjs/flicking-plugins"]), ...imports];
  const methodKeys = Object.keys(methods);
  const declareMethods = methodKeys.length > 0
    ? `,
  methods: {
    ${methodKeys.map(key => `${key}: ${methods[key].split("\n").map((line, idx) => idx > 0  ? `    ${line}` : line).join("\n")}`).join(",\n")}
  }`
    : "";
  const eventStatement = Object.keys(events).map(evt => ` @${evt.replace(/([A-Z])/g, "-$1").toLowerCase()}="${events[evt]}"`).join("");

  return <><CodeBlock className="language-html" title="template">
    {`<Flicking${viewportClass && ` class="${viewportClass}"`}${options ? ` :options="{ ${optionsObject} }"` : ""}${plugins ? " :plugins=\"plugins\"" : ""}${eventStatement}>
  ${panels.filter(panel => !panel.isSlot).map(panel => `<${panel.tag}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}${slotsTemplate}
</Flicking>${siblings ? `\n${siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n")}` : ""}`}
  </CodeBlock>
  <CodeBlock className="language-js" title="script">
    {`${getImports(allImports, { prefix: "vue3" })}

export default {
  components: {
    Flicking
  }${declarePlugins}${declareMethods}
}`}
  </CodeBlock>
  </>;
};
