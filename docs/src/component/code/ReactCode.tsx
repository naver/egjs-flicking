import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getPlugins, getStyle } from "./utils";

export default ({ options, panels, plugins, siblings, imports = [] }: SourceContext) => {
  const declarePlugins = plugins ? `\n  private _plugins = [${getPlugins(plugins)}];\n` : "";
  const slots = panels.filter(panel => panel.isSlot);

  const defaultImports: Array<string | string[]> = [
    ["{ Component }", "react"],
    [slots.length ? "Flicking, { ViewportSlot }" : "Flicking", "@egjs/react-flicking"]
  ];

  if (plugins) {
    defaultImports.push([`{ ${plugins.map(plugin => plugin[0])} }`, "@egjs/flicking-plugins"]);
  }

  defaultImports.push(...imports);

  const slotsTemplate = slots.length
    ? `
      <ViewportSlot>
        ${slots.map(slot => `<${slot.tag}${getClass(slot, "className")}${getStyle(slot, true)}>${slot.content.replace(/class/g, "className")}</${slot.tag}>`).join("\n        ")}
      </ViewportSlot>`
    : "";

  return <CodeBlock className="jsx" title="DemoComponent.jsx">
    {`${getImports(defaultImports, { includeFlicking: false })}

export default class DemoComponent extends Component {${declarePlugins}
  public render() {
    return ${siblings ? "<>\n    " : ""}<Flicking${options ? ` ${Object.keys(options).map(key => `${key}=${typeof options[key] === "string" ? `"${options[key]}"` : `{${options[key]}}`}`).join(" ")}` : ""}${plugins ? " plugins={this._plugins}" : ""}>
      ${panels.filter(panel => !panel.isSlot).map(panel => `<${panel.tag}${getClass(panel, "className")}${getStyle(panel, true)}>${panel.content.replace(/class/g, "className")}</${panel.tag}>`).join("\n      ")}${slotsTemplate}
    </Flicking>${siblings ? `\n    ${siblings.map(el => `<${el.tag}${getClass(el, "className")}${getStyle(el, true)}>${el.content.replace(/class/g, "className")}</${el.tag}>`).join("\n    ")}\n    </>` : ""};
  }
}`}
  </CodeBlock>;
};
