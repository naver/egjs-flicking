/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import Sunny from "@site/static/img/demo/sunny.svg";
import Cloudy from "@site/static/img/demo/cloudy.svg";
import Rainy from "@site/static/img/demo/rainy.svg";
import SourceCode from "@site/src/component/SourceCode";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";
import "../css/demo/weather-display.css";

export default () => {
  const plugins = [new AutoPlay()];

  const reactSourceCode = `import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

export default () => {
  const plugins = [new AutoPlay()];

  return <Flicking circular={true} horizontal={false}>
    <div className="weather-panel">...</div>
    <div className="weather-panel">...</div>
    <div className="weather-panel">...</div>
  </Flicking>;
};`;

const vueSourceCode = `<template>
  <Flicking :options="{ circular: true, horizontal: false }">
    <div class="weather-panel">...</div>
    <div class="weather-panel">...</div>
    <div class="weather-panel">...</div>
  </Flicking>
</template>
<script>
import { AutoPlay } from "@egjs/flicking-plugins";

const plugins = [new AutoPlay()];

module.exports = {
  data: function () {
    return {
      plugins
    }
  }
</script>`;

  return <>
    <Flicking className="weather-display my-6" circular={true} horizontal={false} plugins={plugins}>
      <div className="weather-panel">
        <span className="has-text-weight-bold">21/05/17</span> <Sunny /><span>Sunny</span><span className="has-text-info">14.0°</span><span>/</span><span className="has-text-danger">17.0°</span>
      </div>
      <div className="weather-panel">
        <span className="has-text-weight-bold">21/05/18</span> <Cloudy /><span>Cloudy</span><span className="has-text-info">13.0°</span><span>/</span><span className="has-text-danger">23.0°</span>
      </div>
      <div className="weather-panel">
        <span className="has-text-weight-bold">21/05/19</span> <Rainy /><span>Rainy</span><span className="has-text-info">11.0°</span><span>/</span><span className="has-text-danger">19.0°</span>
      </div>
    </Flicking>
    <SourceCode options={{ circular: true, horizontal: false }} plugins={["AutoPlay"]} panels={[
      { tag: "div", class: "weather-panel", content: "..." },
      { tag: "div", class: "weather-panel", content: "..." },
      { tag: "div", class: "weather-panel", content: "..." }
    ]}
    react={<CodeBlock className="jsx">{reactSourceCode}</CodeBlock>}
    preact={<CodeBlock className="jsx">{reactSourceCode}</CodeBlock>}
    vue={<CodeBlock className="html">{vueSourceCode}</CodeBlock>}
    vue3={<CodeBlock className="html">{vueSourceCode}</CodeBlock>}
    js={<Columns>
      <ColumnItem is={6}>
        <CodeBlock className="html" title="html">
          {`<div id="flick" class="flicking-viewport vertical">
  <div class="flicking-camera">
    <div class="weather-panel">...</div>
    <div class="weather-panel">...</div>
    <div class="weather-panel">...</div>
  </div>
</div>`}
        </CodeBlock>
      </ColumnItem>
      <ColumnItem is={6}>
        <CodeBlock className="js" title="js">
          {`
import Flicking from "@egjs/flicking";
import { AutoPlay } from "@egjs/flicking";

const flicking = new Flicking("#flick", {
  circular: true,
  horizontal: false
});

flicking.addPlugins(new AutoPlay());
`}
        </CodeBlock>
      </ColumnItem>
    </Columns>}
    angular={
    <><CodeBlock className="html" title="app.component.html">
{`<ngx-flicking [plugins]="plugins" [options]="{ circular: true, horizontal: false }">
  <div class="weather-panel">...</div>
  <div class="weather-panel">...</div>
  <div class="weather-panel">...</div>
</ngx-flicking>`}
      </CodeBlock>
      <CodeBlock className="js" title="app.component.ts">
{`import { Component } from "@angular/core";
import { Plugin } from "@egjs/ngx-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

@Component({
  templateUrl: './app.component.html'
})
export class DemoFlickingComponent {
  plugins: Plugin[] = [new AutoPlay()];
}`}
      </CodeBlock></>
    }
    />
  </>;
};
