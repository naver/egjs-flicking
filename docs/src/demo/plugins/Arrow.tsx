/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import { Fade, Arrow } from "@egjs/flicking-plugins";

import Panel from "../../component/Panel";

export default () => {
  const [plugins1, setPlugins1] = useState([]);
  const [plugins2, setPlugins2] = useState([]);
  const [plugins3, setPlugins3] = useState([]);

  useEffect(() => {
    setPlugins1([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-1") })]);
    setPlugins2([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-2") })]);
    setPlugins3([new Fade(), new Arrow({ parentEl: document.querySelector("#arrow-3") })]);
  }, []);

  return (<div className="container">
    <div id="arrow-1" className="arrow-container">
      <Flicking className="mb-6" plugins={plugins1} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
      </Flicking>
      <span className="flicking-arrow-prev"></span>
      <span className="flicking-arrow-next"></span>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" }
    ]} plugins={[["Arrow"]]} />

    <div id="arrow-2" className="arrow-container">
      <Flicking className="mb-6" plugins={plugins2} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
      </Flicking>
      <span className="flicking-arrow-prev is-circle"></span>
      <span className="flicking-arrow-next is-circle"></span>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" }
    ]} plugins={[["Arrow"]]} />

    <div id="arrow-3" className="arrow-container">
      <Flicking className="mb-6" plugins={plugins3} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel" />
        <Panel index={1} color="white" className="card m-2 card-panel" />
        <Panel index={2} color="white" className="card m-2 card-panel" />
      </Flicking>
      <span className="flicking-arrow-prev is-outside"></span>
      <span className="flicking-arrow-next is-outside"></span>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" }
    ]} plugins={[["Arrow"]]} />
  </div>);
};
