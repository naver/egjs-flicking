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

    <SourceCode
      options={{ circular: true }}
      panels={[
        { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">1</span>` },
        { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">2</span>` },
        { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">3</span>` },
        { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">4</span>` },
        { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">5</span>` },
        { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">6</span>` },
      ]}
      plugins={[["Perspective", { rotate: 0.5 }]]}
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

.is-small {
  width: 33%;
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
      { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">1</span>` },
      { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">2</span>` },
      { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">3</span>` },
      { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">4</span>` },
      { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">5</span>` },
      { tag: "div", class: "card-panel is-small", content: `<span class="flicking-index">6</span>` },
    ]} plugins={[["Perspective", { rotate: -1, scale: 2, perspective: 600 }]]} />
  </div>);
};
