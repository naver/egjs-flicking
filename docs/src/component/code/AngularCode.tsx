import React from "react";
import CodeBlock from "@theme/CodeBlock";

import { SourceContext } from "./type";
import { getClass, getOptionsObject, getStyle } from "./utils";

export default ({ options, panels }: SourceContext) => {
  const optionsObject = getOptionsObject(options);

  return <CodeBlock className="html">
    {`<ngx-flicking${options ? ` [options]="{ ${optionsObject} }"` : ""}>
  ${panels.map(panel => `<${panel.tag} flicking-panel${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
  </CodeBlock>;
};
