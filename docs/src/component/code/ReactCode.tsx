import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getStyle } from "./utils";

export default ({ options, panels }: SourceContext) => <CodeBlock className="jsx">
  {`<Flicking${options ? ` ${Object.keys(options).map(key => `${key}=${typeof options[key] === "string" ? `"${options[key]}"` : `{${options[key]}}`}`).join(" ")}` : ""}>
  ${panels.map(panel => `<${panel.tag}${getClass(panel, "className")}${getStyle(panel, true)}>${panel.content.replace(/class/g, "className")}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
</CodeBlock>;
