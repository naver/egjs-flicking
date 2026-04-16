import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import React from "react";

import SandpackEditor from "./SandpackEditor";

interface DemoCodeProps {
  react: string;
  vue3: string;
  js: string;
  jsHtml?: string;
  css?: string;
  dependencies?: Record<string, string>;
}

export default function DemoCode({ react, vue3, js, jsHtml, css, dependencies }: DemoCodeProps) {
  return (
    <Tabs groupId="framework" defaultValue="js">
      <TabItem value="js" label="JavaScript">
        <SandpackEditor template="vanilla" code={js} html={jsHtml} css={css} dependencies={dependencies} />
      </TabItem>
      <TabItem value="react" label="React">
        <SandpackEditor template="react" code={react} css={css} dependencies={dependencies} />
      </TabItem>
      <TabItem value="vue3" label="Vue@3">
        <SandpackEditor template="vue3" code={vue3} css={css} dependencies={dependencies} />
      </TabItem>
    </Tabs>
  );
}
