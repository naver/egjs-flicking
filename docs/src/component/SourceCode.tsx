/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default ({ options, panels, js, react, vue, vue3, angular, preact }) => {
  const withQuoteIfString = (val: any, quote = "\"") => typeof val === "string" ? `${quote}${val}${quote}` : val;
  const getClass = (panel, attribName = "class") => panel.class ? ` ${attribName}="${panel.class}"` : "";
  const getStyle = (panel, jsx = false) => panel.style
    ? jsx
      ? ` style={{ ${Object.keys(panel.style).map(key => `${key}: ${withQuoteIfString(panel.style[key])}`).join(", ")} }}`
      : ` style="${Object.keys(panel.style).map(key => `${key}: ${panel.style[key]};`).join(" ")}"`
    : "";
  const optionsObject = `${Object.keys(options).map(key => `${key}: ${withQuoteIfString(options[key], "'")}`).join(", ")}`;

  const createVanillaFlicking = options
    ? `const flicking = new Flicking("#flick", {
  ${Object.keys(options).map(key => `${key}: ${withQuoteIfString(options[key])}`).join(",\n  ")}
}`
    : `const flicking = new Flicking("#flick")`;

  return <Tabs
    groupId="cfc"
    defaultValue="js"
    values={[
      { label: "JavaScript", value: "js" },
      { label: "React", value: "react" },
      { label: "Vue@2", value: "vue" },
      { label: "Vue@3", value: "vue3" },
      { label: "Angular", value: "angular" },
      { label: "Preact", value: "preact" }
    ]}>
    <TabItem value="js">
      { js ? js : <Columns>
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
      </Columns> }
    </TabItem>
    <TabItem value="react">
      { react ? react : <CodeBlock className="jsx">
{`<Flicking${options ? ` ${Object.keys(options).map(key => `${key}=${typeof options[key] === "string" ? `"${options[key]}"` : `{${options[key]}}`}`).join(" ")}` : ""}>
  ${panels.map(panel => `<${panel.tag}${getClass(panel, "className")}${getStyle(panel, true)}>${panel.content.replace(/class/g, "className")}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
      </CodeBlock> }
    </TabItem>
    <TabItem value="vue">
      {vue ? vue : <CodeBlock className="html">
{`<Flicking${options ? ` :options="{ ${optionsObject} }"` : ""}>
  ${panels.map(panel => `<${panel.tag}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
      </CodeBlock>}
    </TabItem>
    <TabItem value="vue3">
      {vue3 ? vue3 : <CodeBlock className="html">
{`<Flicking${options ? ` :options="{ ${optionsObject} }"` : ""}>
  ${panels.map(panel => `<${panel.tag}${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
      </CodeBlock>}
    </TabItem>
    <TabItem value="angular">
      {angular ? angular : <CodeBlock className="html">
{`<ngx-flicking${options ? ` [options]="{ ${optionsObject} }"` : ""}>
  ${panels.map(panel => `<${panel.tag} flicking-panel${getClass(panel)}${getStyle(panel)}>${panel.content}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
      </CodeBlock>}
    </TabItem>
    <TabItem value="preact">
      {preact ? preact : <CodeBlock className="jsx">
{`<Flicking${options ? ` ${Object.keys(options).map(key => `${key}=${typeof options[key] === "string" ? `"${options[key]}"` : `{${options[key]}}`}`).join(" ")}` : ""}>
  ${panels.map(panel => `<${panel.tag}${getClass(panel, "className")}${getStyle(panel, true)}>${panel.content.replace(/class/g, "className")}</${panel.tag}>`).join("\n  ")}
</Flicking>`}
      </CodeBlock>}
    </TabItem>
  </Tabs>;
};
