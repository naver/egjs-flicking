/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import { Fade, Pagination } from "@egjs/flicking-plugins";

import Panel from "../../component/Panel";

export default () => {
  const [plugins1, setPlugins1] = useState([]);
  const [plugins2, setPlugins2] = useState([]);
  const [plugins3, setPlugins3] = useState([]);

  useEffect(() => {
    setPlugins1([new Fade(), new Pagination({ type: "bullet", parentEl: document.querySelector("#pagination-1") })]);
    setPlugins2([new Fade(), new Pagination({ type: "fraction", parentEl: document.querySelector("#pagination-2") })]);
    setPlugins3([new Fade(), new Pagination({ type: "scroll", parentEl: document.querySelector("#pagination-3") })]);
  }, []);

  return (<div className="container">
    <div id="pagination-1" className="relative-container pb-1 mb-2">
      <Flicking className="pb-6" plugins={plugins1} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
        <Panel index={3} color="white" className="card m-2 card-panel" />
        <Panel index={4} color="white" className="card m-2 card-panel" />
        <Panel index={5} color="white" className="card m-2 card-panel" />
        <Panel index={6} color="white" className="card m-2 card-panel" />
        <Panel index={7} color="white" className="card m-2 card-panel" />
        <Panel index={8} color="white" className="card m-2 card-panel" />
        <ViewportSlot>
          <div className="flicking-pagination" />
        </ViewportSlot>
      </Flicking>
    </div>

    <SourceCode
      options={{ circular: true }}
      panels={[
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">4</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">5</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">6</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">7</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">8</span>` },
        { tag: "div", class: "flicking-pagination", content: "", isSlot: true }
      ]}
      plugins={[["Pagination", { type: "bullet" }]]}
      imports={["@egjs/flicking-plugins/dist/pagination.css"]}
      style={`.flicking-viewport {
  padding-bottom: 3rem !important;
}

.card-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10.2, 10.2, 10.2, 0.1);
  max-width: 100%;
  font-size: 3rem;
  margin: 0.5rem;
  width: 50%;
  height: 200px;
  padding: 30px 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.flicking-index {
  position: relative;
  min-width: 60px;
  text-align: center;
}

.flicking-index::after {
  position: absolute;
  content: "PANEL";
  font-weight: bold;
  left: 0;
  bottom: -1.2rem;
  width: 100%;
  text-align: center;
  font-size: 1rem;
}
`}/>

    <div id="pagination-2" className="relative-container pb-1 mb-2">
      <Flicking className="pb-6" plugins={plugins2} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
        <Panel index={3} color="white" className="card m-2 card-panel" />
        <Panel index={4} color="white" className="card m-2 card-panel" />
        <Panel index={5} color="white" className="card m-2 card-panel" />
        <Panel index={6} color="white" className="card m-2 card-panel" />
        <Panel index={7} color="white" className="card m-2 card-panel" />
        <Panel index={8} color="white" className="card m-2 card-panel" />
        <ViewportSlot>
          <div className="flicking-pagination" />
        </ViewportSlot>
      </Flicking>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">4</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">5</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">6</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">7</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">8</span>` },
      { tag: "div", class: "flicking-pagination", content: "", isSlot: true }
    ]} plugins={[["Pagination", { type: "fraction" }]]}
    imports={["@egjs/flicking-plugins/dist/pagination.css"]} />

    <div id="pagination-3" className="relative-container pb-1 mb-2">
      <Flicking className="pb-6" plugins={plugins3} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
        <Panel index={3} color="white" className="card m-2 card-panel" />
        <Panel index={4} color="white" className="card m-2 card-panel" />
        <Panel index={5} color="white" className="card m-2 card-panel" />
        <Panel index={6} color="white" className="card m-2 card-panel" />
        <Panel index={7} color="white" className="card m-2 card-panel" />
        <Panel index={8} color="white" className="card m-2 card-panel" />
        <ViewportSlot>
          <div className="flicking-pagination" />
        </ViewportSlot>
      </Flicking>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">4</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">5</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">6</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">7</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">8</span>` },
      { tag: "div", class: "flicking-pagination", content: "", isSlot: true }
    ]} plugins={[["Pagination", { type: "scroll" }]]}
    imports={["@egjs/flicking-plugins/dist/pagination.css"]} />
  </div>);
};
