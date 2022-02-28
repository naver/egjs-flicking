/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import { Perspective } from "@egjs/flicking-plugins";

import Panel from "../../component/Panel";

export default () => {
  const [plugins1, setPlugins1] = useState([]);
  const [plugins2, setPlugins2] = useState([]);

  useEffect(() => {
    setPlugins1([new Perspective({ rotate: 0.5 })]);
    setPlugins2([new Perspective({ rotate: -1, scale: 2, perspective: 600 })]);
  }, []);

  return (<div className="container">
    <div id="perspective-1" className="relative-container">
      <Flicking className="pb-6" plugins={plugins1} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel is-small" />
        <Panel index={1} color="white" className="card m-2 card-panel is-small" />
        <Panel index={2} color="white" className="card m-2 card-panel is-small" />
        <Panel index={3} color="white" className="card m-2 card-panel is-small" />
        <Panel index={4} color="white" className="card m-2 card-panel is-small" />
        <Panel index={5} color="white" className="card m-2 card-panel is-small" />
      </Flicking>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" },
      { tag: "div", class: "card-panel", content: "4" },
      { tag: "div", class: "card-panel", content: "5" },
      { tag: "div", class: "card-panel", content: "6" }
    ]} plugins={[["Perspective", { rotate: 0.5 }]]} />

    <div id="perspective-2" className="relative-container">
      <Flicking className="pb-6" plugins={plugins2} circular={true}>
        <Panel index={0} color="white" className="card m-2 card-panel is-small" />
        <Panel index={1} color="white" className="card m-2 card-panel is-small" />
        <Panel index={2} color="white" className="card m-2 card-panel is-small" />
        <Panel index={3} color="white" className="card m-2 card-panel is-small" />
        <Panel index={4} color="white" className="card m-2 card-panel is-small" />
        <Panel index={5} color="white" className="card m-2 card-panel is-small" />
      </Flicking>
    </div>

    <SourceCode options={{ circular: true }} panels={[
      { tag: "div", class: "card-panel", content: "1" },
      { tag: "div", class: "card-panel", content: "2" },
      { tag: "div", class: "card-panel", content: "3" },
      { tag: "div", class: "card-panel", content: "4" },
      { tag: "div", class: "card-panel", content: "5" },
      { tag: "div", class: "card-panel", content: "6" }
    ]} plugins={[["Perspective", { rotate: -1, scale: 2, perspective: 600 }]]} />
  </div>);
};
