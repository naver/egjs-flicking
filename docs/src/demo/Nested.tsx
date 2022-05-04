/* eslint-disable @typescript-eslint/indent */
import React from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

import Panel from "../component/Panel";

export default () => {
  const vanillaHTML = `<div id="flick1" class="flicking-viewport">
  <div className="flicking-panel nested-wide">
    <div id="flick2" class="flicking-viewport">
      <div className="flicking-panel nested-wide">
        <div id="flick5" class="flicking-viewport vertical">
          <div className="flicking-panel">1.09</div>
          <div className="flicking-panel">1.1</div>
          <div className="flicking-panel">1.11</div>
        </div>
      </div>
      <div className="flicking-panel">1.2</div>
      <div className="flicking-panel">1.3</div>
    </div>
  </div>
  <div className="flicking-panel nested-wide">
    <div id="flick3" class="flicking-viewport">
      <div className="flicking-panel">2.1</div>
      <div className="flicking-panel">2.2</div>
      <div className="flicking-panel">2.3</div>
    </div>
  </div>
  <div className="flicking-panel nested-wide">
    <div id="flick4" class="flicking-viewport">
      <div className="flicking-panel">3.1</div>
      <div className="flicking-panel">3.2</div>
      <div className="flicking-panel">3.3</div>
    </div>
  </div>
</div>`;
  const vanillaJS = `const flicking1 = new Flicking("#flick1", {
  circular: true
});
const flicking2 = new Flicking("#flick2", {
  bounce: 0,
  bound: true,
  nested: true
});
const flicking3 = new Flicking("#flick3", {
  bounce: 0,
  bound: true,
  nested: true
});
const flicking4 = new Flicking("#flick4", {
  bounce: 0,
  bound: true,
  nested: true
});
const flicking5 = new Flicking("#flick5", {
  bounce: 0,
  bound: true,
  horizontal: false,
  defaultIndex: 1,
  circular: true
});`;
  const reactSourceCode = `export default () => {
    return <>
      <Flicking circular={true}>
        <div className="flicking-panel nested-wide">
          <Flicking bounce="0" bound={true} nested={true}>
            <div className="flicking-panel nested-wide">
              <Flicking bounce="0" bound={true} horizontal={false} defaultIndex={1} circular={true}>
                <div className="flicking-panel">1.09</div>
                <div className="flicking-panel">1.1</div>
                <div className="flicking-panel">1.11</div>
              </Flicking>
            </div>
            <div className="flicking-panel">1.2</div>
            <div className="flicking-panel">1.3</div>
          </Flicking>
        </div>
        <div className="flicking-panel nested-wide">
          <Flicking bounce="0" bound={true} nested={true}>
            <div className="flicking-panel">2.1</div>
            <div className="flicking-panel">2.2</div>
            <div className="flicking-panel">2.3</div>
          </Flicking>
        </div>
        <div className="flicking-panel nested-wide">
          <Flicking bounce="0" bound={true} nested={true}>
            <div className="flicking-panel">3.1</div>
            <div className="flicking-panel">3.2</div>
            <div className="flicking-panel">3.3</div>
          </Flicking>
        </div>
      </Flicking>
    </>
  };`;
  const angularSourceCode = `<ngx-flicking [options]="{ circular: true }">
  <div flicking-panel class="nested-wide">
    <ngx-flicking [options]="{ bounce: 0, bound: true, nested: true }">
      <div flicking-panel class="nested-wide">
        <ngx-flicking [options]="{ bounce: 0, bound: true, horizontal: false, defaultIndex: 1, circular: true }">
          <div flicking-panel>1.09</div>
          <div flicking-panel>1.1</div>
          <div flicking-panel>1.11</div>
        </div>
      </div>
      <div flicking-panel>1.2</div>
      <div flicking-panel>1.3</div>
    </div>
  </div>
  <div flicking-panel class="nested-wide">
    <ngx-flicking [options]="{ bounce: 0, bound: true, nested: true }">
      <div flicking-panel>2.1</div>
      <div flicking-panel>2.2</div>
      <div flicking-panel>2.3</div>
    </div>
  </div>
  <div flicking-panel class="nested-wide">
    <ngx-flicking [options]="{ bounce: 0, bound: true, nested: true }">
      <div flicking-panel>3.1</div>
      <div flicking-panel>3.2</div>
      <div flicking-panel>3.3</div>
    </div>
  </div>
</div>`;
  const vueSourceCode = `<flicking :options="{ circular: true }">
  <div class="flicking-panel nested-wide">
    <flicking :options="{ bounce: 0, bound: true, nested: true }">
      <div class="flicking-panel nested-wide">
        <flicking :options="{ bounce: 0, bound: true, horizontal: false, defaultIndex: 1, circular: true }">
          <div class="flicking-panel">1.09</div>
          <div class="flicking-panel">1.1</div>
          <div class="flicking-panel">1.11</div>
        </flicking>
      </div>
      <div class="flicking-panel">1.2</div>
      <div class="flicking-panel">1.3</div>
    </flicking>
  </div>
  <div class="flicking-panel nested-wide">
    <flicking :options="{ bounce: 0, bound: true, nested: true }">
      <div class="flicking-panel">2.1</div>
      <div class="flicking-panel">2.2</div>
      <div class="flicking-panel">2.3</div>
    </flicking>
  </div>
  <div class="flicking-panel nested-wide">
    <flicking :options="{ bounce: 0, bound: true, nested: true }">
      <div class="flicking-panel">3.1</div>
      <div class="flicking-panel">3.2</div>
      <div class="flicking-panel">3.3</div>
    </flicking>
  </div>
</flicking>`;
  const svelteSourceCode = `<script lang="ts">
import Flicking, { FlickingPanel } from "@egjs/svelte-flicking";
</script>

<Flicking options={{ circular: true }}>
  <FlickingPanel class="nested-wide">
    <Flicking options={{ bounce: 0, bound: true, nested: true }}>
      <FlickingPanel class="nested-wide">
        <Flicking options={{ bounce: 0, bound: true, horizontal: false, defaultIndex: 1, circular: true }}>
          <FlickingPanel>1.09</FlickingPanel>
          <FlickingPanel>1.1</FlickingPanel>
          <FlickingPanel>1.11</FlickingPanel>
        </Flicking>
      </FlickingPanel>
      <FlickingPanel>1.2</FlickingPanel>
      <FlickingPanel>1.3</FlickingPanel>
    </Flicking>
  </FlickingPanel>
  <FlickingPanel class="nested-wide">
    <Flicking options={{ bounce: 0, bound: true, nested: true }}>
      <FlickingPanel>2.1</FlickingPanel>
      <FlickingPanel>2.2</FlickingPanel>
      <FlickingPanel>2.3</FlickingPanel>
    </Flicking>
  </FlickingPanel>
  <FlickingPanel class="nested-wide">
    <Flicking options={{ bounce: 0, bound: true, nested: true }}>
      <FlickingPanel>3.1</FlickingPanel>
      <FlickingPanel>3.2</FlickingPanel>
      <FlickingPanel>3.3</FlickingPanel>
    </Flicking>
  </FlickingPanel>
</Flicking>`;

  return <>
    <Flicking className="py-4 mb-4" circular={true}>
      <div className="flicking-panel nested-wide has-background-primary-dark">
        <Flicking bounce="0" bound={true} nested={true}>
          <div className="flicking-panel nested-wide">
            <Flicking bounce="0" bound={true} horizontal={false} style={{ height: "140px" }} defaultIndex={1} circular={true}>
              <Panel index={0.09} />
              <Panel index={0.1} />
              <Panel index={0.11} />
            </Flicking>
          </div>
          <Panel index={0.2} />
          <Panel index={0.3} />
        </Flicking>
      </div>
      <div className="flicking-panel nested-wide has-background-primary-dark">
        <Flicking bounce="0" bound={true} nested={true}>
          <Panel index={1.1} />
          <Panel index={1.2} />
          <Panel index={1.3} />
        </Flicking>
      </div>
      <div className="flicking-panel nested-wide has-background-primary-dark">
        <Flicking bounce="0" bound={true} nested={true}>
          <Panel index={2.1} />
          <Panel index={2.2} />
          <Panel index={2.3} />
        </Flicking>
      </div>
    </Flicking>
    <SourceCode
      options={{ circular: true }} panels={[]}
      js={
<Columns>
  <ColumnItem is={6}>
    <CodeBlock className="language-html" title="html">
      { vanillaHTML }
    </CodeBlock>
  </ColumnItem>
  <ColumnItem is={6}>
    <CodeBlock className="language-js" title="js">
      { vanillaJS }
    </CodeBlock>
  </ColumnItem>
</Columns>}
  react={
    <CodeBlock className="language-jsx" title="DemoComponent.jsx">
{ reactSourceCode }
    </CodeBlock>
  }
  vue={
    <><CodeBlock className="language-html" title="template">
{ vueSourceCode }
  </CodeBlock>
  <CodeBlock className="language-js" title="script">
  {`import Flicking from "@egjs/vue-flicking";

export default {
    components: {
        Flicking
    }
};`}
  </CodeBlock></>
  }
  vue3={
    <><CodeBlock className="language-html" title="template">
{ vueSourceCode }
  </CodeBlock>
  <CodeBlock className="language-js" title="script">
  {`import Flicking from "@egjs/vue3-flicking";

export default {
    components: {
        Flicking
    }
};`}
  </CodeBlock></>
  }
  angular={
    <><CodeBlock className="language-html" title="app.component.html">
{ angularSourceCode }
  </CodeBlock>
  <CodeBlock className="language-js" title="app.component.ts">
  {`import { Component } from "@angular/core";
import Flicking from "@egjs/ngx-flicking";

@Component({
  templateUrl: './demo.component.html'
})
export class DemoComponent {}`}
  </CodeBlock></>
  }
  preact={
    <CodeBlock className="language-jsx" title="DemoComponent.jsx">
      { reactSourceCode }
    </CodeBlock>
  }
  svelte={
    <CodeBlock className="language-jsx" title="DemoComponent.jsx">
      { svelteSourceCode }
    </CodeBlock>
  }
/>
  </>;
};
