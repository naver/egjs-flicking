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

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" },
      { tag: "div", class: "card-panel", content: "4" },
      { tag: "div", class: "card-panel", content: "5" },
      { tag: "div", class: "card-panel", content: "6" },
      { tag: "div", class: "card-panel", content: "7" },
      { tag: "div", class: "card-panel", content: "8" },
      { tag: "div", class: "flicking-pagination", content: "", isSlot: true }
    ]} plugins={[["Pagination", { type: "bullet" }]]} />

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
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" },
      { tag: "div", class: "card-panel", content: "4" },
      { tag: "div", class: "card-panel", content: "5" },
      { tag: "div", class: "card-panel", content: "6" },
      { tag: "div", class: "card-panel", content: "7" },
      { tag: "div", class: "card-panel", content: "8" },
      { tag: "div", class: "flicking-pagination", content: "", isSlot: true }
    ]} plugins={[["Pagination", { type: "fraction" }]]} />

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
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" },
      { tag: "div", class: "card-panel", content: "4" },
      { tag: "div", class: "card-panel", content: "5" },
      { tag: "div", class: "card-panel", content: "6" },
      { tag: "div", class: "card-panel", content: "7" },
      { tag: "div", class: "card-panel", content: "8" },
      { tag: "div", class: "flicking-pagination", content: "", isSlot: true }
    ]} plugins={[["Pagination", { type: "scroll" }]]} />
  </div>);
};
