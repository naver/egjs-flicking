/* eslint-disable @typescript-eslint/indent */
import React, { useState } from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";

import Panel from "../component/Panel";

export default () => {
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
  const reactSourceCode = `export default () => {
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);

  return <>
    <Flicking renderOnlyVisible={true}>
      {panels.map(index => <div className="flicking-panel" key={index}>{index + 1}</div>)}
    </Flicking>
    <div className="block is-flex is-justify-content-center">
      <span className="button mr-2 is-info is-outlined" onClick={() => setPanels([panels[0] - 1, ...panels])}>Prepend</span>
      <span className="button mr-2 is-info is-outlined" onClick={() => setPanels([...panels, panels[panels.length - 1] + 1])}>Append</span>
    </div>
  </>
};`;
  const vueSourceCode = `<template>
  <div class="wrapper">
    <Flicking :options="{ renderOnlyVisible: true }">
      <div v-for="idx in list" class="flicking-panel" :key="idx">{{ idx }}</div>
    </Flicking>
    <div class="block is-flex is-justify-content-center">
      <span class="button mr-2 is-info is-outlined" @click="() => {
        list.splice(0, 0, ...[list[0] - 2, list[0] - 1]);
      }">Prepend</span>
      <span class="button mr-2 is-info is-outlined" @click="() => {
        list.push(list[list.length - 1] + 1, list[list.length - 1] + 2);
      }">Append</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [0, 1, 2, 3, 4]
    }
  }
}
</script>`;

  return <>
    <Flicking className="py-4 mb-4" renderOnlyVisible={true}>
      {panels.map(index => <Panel key={index} index={index} />)}
    </Flicking>
    <div className="block is-flex is-justify-content-center">
      <span className="button mr-2 is-info is-outlined" onClick={() => setPanels([panels[0] - 1, ...panels])}>Prepend</span>
      <span className="button mr-2 is-info is-outlined" onClick={() => setPanels([...panels, panels[panels.length - 1] + 1])}>Append</span>
    </div>
    <SourceCode
      options={{ renderOnlyVisible: true }} panels={[]}
      js={
<Columns>
  <ColumnItem is={6}>
    <CodeBlock className="language-html" title="html">
      {`<div id="flick" class="flicking-viewport">
  <div class="flicking-camera">
    <div class="flicking-panel">1</div>
    <div class="flicking-panel">2</div>
    <div class="flicking-panel">3</div>
    <div class="flicking-panel">4</div>
    <div class="flicking-panel">5</div>
  </div>
</div>
<div class="block is-flex is-justify-content-center">
  <span id="btn-prepend" class="button mr-2 is-info is-outlined">Prepend</span>
  <span id="btn-append" class="button mr-2 is-info is-outlined">Append</span>
</div>`}
    </CodeBlock>
  </ColumnItem>
  <ColumnItem is={6}>
    <CodeBlock className="language-js" title="js">
          {`const flicking = new Flicking("#flick", {
  renderOnlyVisible: true
});
let minIdx = 1;
let maxIdx = 5;

const prependBtn = document.querySelector("#btn-prepend");
const appendBtn = document.querySelector("#btn-append");

prependBtn.addEventListener("click", () => {
  flicking.prepend(\`<div class="flicking-panel">\${--minIdx}</div>\`)
});
appendBtn.addEventListener("click", () => {
  flicking.append(\`<div class="flicking-panel">\${++maxIdx}</div>\`)
});
`}
    </CodeBlock>
  </ColumnItem>
</Columns>}
  react={
    <CodeBlock className="language-jsx">
{ reactSourceCode }
    </CodeBlock>
  }
  vue={
    <CodeBlock className="language-html">
{ vueSourceCode }
    </CodeBlock>
  }
  vue3={
    <CodeBlock className="language-html">
{ vueSourceCode }
    </CodeBlock>
  }
  angular={
    <><CodeBlock className="language-html" title="app.component.html">
{`<ngx-flicking [options]="{ renderOnlyVisible: true }">
  <div flicking-panel *ngFor="let idx of list" class="flicking-panel">{{ idx }}</div>
</ngx-flicking>
<div class="block is-flex is-justify-content-center">
  <span class="button mr-2 is-info is-outlined" (click)="onPrepend()">Prepend</span>
  <span class="button mr-2 is-info is-outlined" (click)="onAppend()">Append</span>
</div>`}
  </CodeBlock>
  <CodeBlock className="language-js" title="app.component.ts">
  {`@Component({})
export class DemoFlickingComponent {
  list = [0, 1, 2, 3, 4];

  onPrepend() {
    this.list = [this.list[0] - 1, ...this.list];
  }

  onAppend() {
    this.list = [...this.list, this.list[this.list.length - 1] + 1];
  }
}`}
  </CodeBlock></>
  }
  preact={
    <CodeBlock className="language-jsx">
      { reactSourceCode }
    </CodeBlock>
  }
  svelte={
    <CodeBlock className="language-jsx">
    {`<script>
  import Flicking, { FlickingPanel } from "@egjs/svelte-flicking";
  import "@egjs/svelte-flicking/dist/flicking.css";

  let list = [0, 1, 2, 3, 4];

  function prepend() {
    list = [list[0] - 1, ...list];
  }

  function append() {
    list = [...list, list[list.length - 1] + 1];
  }
</script>

<Flicking bind:this={flicking}>
  {#each list as idx (idx)}
    <FlickingPanel class="flicking-panel">{ idx }</FlickingPanel>
  {/each}
</Flicking>
<div class="block is-flex is-justify-content-center">
  <span class="button mr-2 is-info is-outlined" on:click={prepend}>Prepend</span>
  <span class="button mr-2 is-info is-outlined" on:click={append}>Append</span>
</div>
`}
    </CodeBlock>
  }
/>
  </>;
};
