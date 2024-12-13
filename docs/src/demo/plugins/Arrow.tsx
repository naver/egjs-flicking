/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import { Fade, Arrow } from "@egjs/flicking-plugins";

import Panel from "../../component/Panel";

export default () => {
  const [plugins1, setPlugins1] = useState([]);
  const [plugins2, setPlugins2] = useState([]);
  const [plugins3, setPlugins3] = useState([]);
  const [plugins4, setPlugins4] = useState([]);

  useEffect(() => {
    setPlugins1([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-1") })]);
    setPlugins2([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-2") })]);
    setPlugins3([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-3") })]);
    setPlugins4([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-4") })]);
  }, []);

  return (<div className="container">
    <div id="arrow-1" className="relative-container">
      <Flicking className="mb-6" plugins={plugins1} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
        <ViewportSlot>
          <span className="flicking-arrow-prev"></span>
          <span className="flicking-arrow-next"></span>
        </ViewportSlot>
      </Flicking>
    </div>

    <SourceCode
      options={{ circular: true }}
      panels={[
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
        { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
        { tag: "span", class: "flicking-arrow-prev", content: "", isSlot: true },
        { tag: "span", class: "flicking-arrow-next", content: "", isSlot: true }
      ]}
      plugins={[["Arrow"]]}
      imports={["@egjs/flicking-plugins/dist/arrow.css"]}
      style={`.card-panel {
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

    <div id="arrow-2" className="relative-container">
      <Flicking className="mb-6" plugins={plugins2} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
        <ViewportSlot>
          <span className="flicking-arrow-prev is-circle"></span>
          <span className="flicking-arrow-next is-circle"></span>
        </ViewportSlot>
      </Flicking>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
      { tag: "span", class: "flicking-arrow-prev is-circle", content: "", isSlot: true },
      { tag: "span", class: "flicking-arrow-next is-circle", content: "", isSlot: true }
    ]} plugins={[["Arrow"]]} imports={["@egjs/flicking-plugins/dist/arrow.css"]} />

    <div id="arrow-3" className="relative-container">
      <Flicking className="mb-6" plugins={plugins3} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
      </Flicking>
      <span className="flicking-arrow-prev is-outside"></span>
      <span className="flicking-arrow-next is-outside"></span>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
    ]} siblings={[
      { tag: "span", class: "flicking-arrow-prev is-outside", content: "" },
      { tag: "span", class: "flicking-arrow-next is-outside", content: "" }
    ]} plugins={[["Arrow"]]}
    imports={["@egjs/flicking-plugins/dist/arrow.css"]} />

    <div id="arrow-4" className="relative-container">
      <Flicking className="mb-6" plugins={plugins4} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
      </Flicking>
      <span className="flicking-arrow-prev is-thin"></span>
      <span className="flicking-arrow-next is-thin"></span>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">1</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">2</span>` },
      { tag: "div", class: "card-panel", content: `<span class="flicking-index">3</span>` },
    ]} siblings={[
      { tag: "span", class: "flicking-arrow-prev is-thin", content: "" },
      { tag: "span", class: "flicking-arrow-next is-thin", content: "" }
    ]} plugins={[["Arrow"]]}
    imports={["@egjs/flicking-plugins/dist/arrow.css"]} />
  </div>);
};
