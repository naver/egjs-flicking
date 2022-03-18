/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import Flicking from "@egjs/react-flicking";
import { FrameGrid } from "@egjs/react-grid";
import SourceCode from "@site/src/component/SourceCode";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";
import "@site/src/css/demo/grid.css";

export default () => {
  const gridOptions = [
    { gap: 10, frame: `[[1, 1, 2, 2], [3, 3, 2, 2], [4, 4, 4, 5]]`},
    { gap: 10, frame: `[[1, 1, 1, 1], [2, 2, 3, 3], [4, 5, 5, 6]]`}
  ];
  const reactSourceCode = <CodeBlock className="language-jsx">{`<Flicking circular={true}>
  <div className="grid-panel">1</div>
  <FrameGrid className="grid-panel">
    <div className="has-background-warning has-text-dark">2</div>
    <div className="has-background-danger has-text-white">3</div>
    <div className="has-background-info has-text-white">4</div>
    <div className="has-background-success has-text-white">5</div>
    <div className="has-background-grey has-text-white">6</div>
  </FrameGrid>
  <div className="grid-panel">7</div>
  <FrameGrid className="grid-panel">
    <div className="has-background-light has-text-dark ">8</div>
    <div className="has-background-grey has-text-white">9</div>
    <div className="has-background-info has-text-white">10</div>
    <div className="has-background-success has-text-white">11</div>
    <div className="has-background-warning has-text-dark">12</div>
    <div className="has-background-danger has-text-white">13</div>
  </FrameGrid>
</Flicking>`}</CodeBlock>;

  return <>
    <Flicking className="py-4 mb-4" circular={true} useFindDOMNode={true}>
      <div className="grid-panel has-background-primary has-text-white">1</div>
      <FrameGrid className="grid-panel" gap={10} frame={[[1, 1, 2, 2], [3, 3, 2, 2], [4, 4, 4, 5]]}>
        <div className="has-background-warning has-text-dark">2</div>
        <div className="has-background-danger has-text-white">3</div>
        <div className="has-background-info has-text-white">4</div>
        <div className="has-background-success has-text-white">5</div>
        <div className="has-background-grey has-text-white">6</div>
      </FrameGrid>
      <div className="grid-panel has-background-grey-darker has-text-white">7</div>
      <FrameGrid className="grid-panel" gap={10} frame={[[1, 1, 1, 1], [2, 2, 3, 3], [4, 5, 5, 6]]}>
        <div className="has-background-light has-text-dark ">8</div>
        <div className="has-background-grey has-text-white">9</div>
        <div className="has-background-info has-text-white">10</div>
        <div className="has-background-success has-text-white">11</div>
        <div className="has-background-warning has-text-dark">12</div>
        <div className="has-background-danger has-text-white">13</div>
      </FrameGrid>
    </Flicking>
    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "grid-panel", content: "1" },
      { tag: "FrameGrid", class: "grid-panel", content: `
    <div class="has-background-warning has-text-dark">2</div>
    <div class="has-background-danger has-text-white">3</div>
    <div class="has-background-info has-text-white">4</div>
    <div class="has-background-success has-text-white">5</div>
    <div class="has-background-grey has-text-white">6</div>
  ` },
      { tag: "div", class: "grid-panel", content: "7"},
      { tag: "FrameGrid", class: "grid-panel", content: `
    <div class="has-background-light has-text-dark ">8</div>
    <div class="has-background-grey has-text-white">9</div>
    <div class="has-background-info has-text-white">10</div>
    <div class="has-background-success has-text-white">11</div>
    <div class="has-background-warning has-text-dark">12</div>
    <div class="has-background-danger has-text-white">13</div>
  ` }
    ]} js={
      <Columns>
        <ColumnItem is={6}>
          <CodeBlock className="language-html" title="html">
            {`<div id="flick" class="flicking-viewport">
  <div class="flicking-camera">
    <div className="grid-panel has-background-primary has-text-white">1</div>
    <div id="grid1" className="grid-panel">
      <div class="has-background-warning has-text-dark">2</div>
      <div class="has-background-danger has-text-white">3</div>
      <div class="has-background-info has-text-white">4</div>
      <div class="has-background-success has-text-white">5</div>
      <div class="has-background-grey has-text-white">6</div>
    </div>
    <div className="grid-panel has-background-grey-darker has-text-white">7</div>
    <div id="grid2" className="grid-panel">
      <div class="has-background-light has-text-dark ">8</div>
      <div class="has-background-grey has-text-white">9</div>
      <div class="has-background-info has-text-white">10</div>
      <div class="has-background-success has-text-white">11</div>
      <div class="has-background-warning has-text-dark">12</div>
      <div class="has-background-danger has-text-white">13</div>
    </div>
  </div>
</div>`}
          </CodeBlock>
        </ColumnItem>
        <ColumnItem is={6}>
          <CodeBlock className="language-js" title="js">
            {`import { FrameGrid } from "@egjs/grid";

const flicking = new Flicking("#flick", {
  circular: true
});
const grid1 = new FrameGrid("#grid1", {
  gap: 10,
  frame: ${gridOptions[0].frame}
});
const grid2 = new FrameGrid("#grid2", {
  gap: 10,
  frame: ${gridOptions[1].frame}
});
`}
          </CodeBlock>
        </ColumnItem>
      </Columns>}
    react={reactSourceCode} preact={reactSourceCode} />
  </>;
};
