import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

import { SourceContext } from "./type";
import { getClass, getStyle, withQuoteIfString } from "./utils";

export default ({ options, panels }: SourceContext) => {
  const createVanillaFlicking = options
    ? `const flicking = new Flicking("#flick", {
  ${Object.keys(options).map(key => `${key}: ${withQuoteIfString(options[key])}`).join(",\n  ")}
}`
    : "const flicking = new Flicking(\"#flick\")";

  return <Columns>
    <ColumnItem is={6}>
      <CodeBlock className="html" title="html">
        {`<div id="flick" class="flicking-viewport${options.horizontal === false ? " vertical" : "" }">
  <div class="flicking-camera">
    ${panels.map(panel => `<${panel.tag}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n    ")}
  </div>
</div>`}
      </CodeBlock>
    </ColumnItem>
    <ColumnItem is={6}>
      <CodeBlock className="js" title="js">
        {`${createVanillaFlicking}`}
      </CodeBlock>
    </ColumnItem>
  </Columns>;
};
