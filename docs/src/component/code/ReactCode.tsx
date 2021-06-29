import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getImports, getPlugins, getStyle } from "./utils";

export default ({ options, panels, plugins, siblings }: SourceContext) => {
  const declarePlugins = plugins ? `\n  private _plugins = [${getPlugins(plugins)}];\n` : "";

  return <CodeBlock className="jsx" title="DemoComponent.jsx">
    {`${getImports(plugins, "react")}

export default class DemoComponent extends React.Component {${declarePlugins}
  public render() {
    return ${siblings ? "<>\n    " : ""}<Flicking${options ? ` ${Object.keys(options).map(key => `${key}=${typeof options[key] === "string" ? `"${options[key]}"` : `{${options[key]}}`}`).join(" ")}` : ""}${plugins ? " plugins={this._plugins}" : ""}>
      ${panels.map(panel => `<${panel.tag}${panel.isSlot ? " slot=\"viewport\"" : ""}${getClass(panel, "className")}${getStyle(panel, true)}>${panel.content.replace(/class/g, "className")}</${panel.tag}>`).join("\n      ")}
    </Flicking>${siblings ? `\n    ${siblings.map(el => `<${el.tag}${getClass(el, "className")}${getStyle(el, true)}>${el.content.replace(/class/g, "className")}</${el.tag}>`).join("\n    ")}\n    </>` : ""};
  }
}`}
  </CodeBlock>;
};
