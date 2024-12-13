import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getOptionsObject, getPlugins, getStyle } from "./utils";

export default ({ options, panels, events = {}, methods = {}, plugins, siblings = [], imports = [], viewportClass="" }: SourceContext) => {
  const optionsObject = getOptionsObject(options);
  const pluginsDeclaration = plugins
    ? `\n  public plugins: Plugin[] = [${getPlugins(plugins)}];\n`
    : "";
  const defaultImports: Array<string | string[]> = [
    ["{ Component }", "@angular/core"],
    [plugins ? "Flicking, { Plugin }" : "Flicking", "@egjs/ngx-flicking"]
  ];

  if (plugins) {
    defaultImports.push([`{ ${plugins.map(plugin => plugin[0])} }`, "@egjs/flicking-plugins"]);
  }

  const methodKeys = Object.keys(methods);
  const declareMethods = methodKeys.length > 0
    ? `\n${methodKeys.map(key => `${key} = ${methods[key]}`.split("\n").map(line => `  ${line}`).join("\n"))}\n`
    : "";

  const cssImports = imports.filter(val => !Array.isArray(val));
  const styleUrls = cssImports.length
    ? `,\n  styleUrls: [\n${cssImports.map(imp => `    "../node_modules/${imp}"`)}\n  ]`
    : "";

  defaultImports.push(...imports.filter(val => Array.isArray(val)));

  const eventStatement = Object.keys(events).map(evt => ` (${evt})="${events[evt]}($event)"`).join("");

  return <><CodeBlock className="language-html" title="demo.component.html">
    {`<ngx-flicking${viewportClass && ` className="${viewportClass}"`}${options ? ` [options]="{ ${optionsObject} }"` : ""}${plugins ? " [plugins]=\"plugins\"" : ""}${eventStatement}>
  ${panels.map(panel => `<${panel.tag} ${panel.isSlot ? "in-viewport" : "flicking-panel"}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</ngx-flicking>${siblings ? `\n${siblings.map(el => `<${el.tag}${getClass(el)}${getStyle(el)}>${el.content}</${el.tag}>`).join("\n")}` : ""}`}
  </CodeBlock>
  <CodeBlock className="language-ts" title="demo.component.ts">
    {`${getImports(defaultImports, { includeFlicking: false })}

@Component({
  templateUrl: './demo.component.html'${styleUrls}
})
export class DemoComponent {${pluginsDeclaration}${declareMethods}}`}
  </CodeBlock>
  </>;
};
