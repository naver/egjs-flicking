import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getOptionsObject, getPlugins, getStyle } from "./utils";

export default ({ options, panels, plugins, siblings }: SourceContext) => {
  const optionsObject = getOptionsObject(options);
  const pluginsImport = plugins
    ? `
import { Plugin } from "@egjs/ngx-flicking";
import { ${plugins.map(plugin => plugin[0]).join(", ")} } from "@egjs/flicking-plugins";` : "";
  const pluginsDeclaration = plugins
    ? `\n  public plugins: Plugin[] = [${getPlugins(plugins)}];\n`
    : "";

  return <><CodeBlock className="html" title="demo.component.html">
    {`<ngx-flicking${options ? ` [options]="{ ${optionsObject} }"` : ""}${plugins ? " [plugins]=\"plugins\"" : ""}>
  ${panels.map(panel => `<${panel.tag} ${panel.isSlot ? "in-viewport" : "flicking-panel"}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</ngx-flicking>${siblings ? `\n${siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n")}` : ""}`}
  </CodeBlock>
  <CodeBlock className="ts" title="demo.component.ts">
    {`import { Component } from "@angular/core";${pluginsImport}

@Component({
  templateUrl: './demo.component.html'
})
export class DemoComponent {${pluginsDeclaration}}`}
  </CodeBlock>
  </>;
};
