/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import { Fade } from "@egjs/flicking-plugins";

export default () => {
  const plugins = [new Fade()];

  return (<div className="container">
    <Flicking className="mb-2" plugins={plugins} circular={true}>
      <div className="plugins-panel">
        <img className="panel-image" src={require("@site/static/img/demo/bg01.jpg").default} />
      </div>
      <div className="plugins-panel">
        <img className="panel-image" src={require("@site/static/img/demo/bg02.jpg").default} />
      </div>
      <div className="plugins-panel">
        <img className="panel-image" src={require("@site/static/img/demo/bg03.jpg").default} />
      </div>
    </Flicking>

    <SourceCode 
      options={{ circular: true }}
      panels={[
        { tag: "div", class: "plugins-panel", content: `<img class="panel-image" src="/img/demo/bg01.jpg" />` },
        { tag: "div", class: "plugins-panel", content: `<img class="panel-image" src="/img/demo/bg02.jpg" />` },
        { tag: "div", class: "plugins-panel", content: `<img class="panel-image" src="/img/demo/bg03.jpg" />` },
      ]}
      plugins={[["Fade"]]}
      style={`.plugins-panel {
  position: relative;
  border-radius: 5px;
  width: 80%;
  margin-right: 10px;
  height: 200px;
  overflow: hidden;
}

.panel-image {
  top: -100%;
  bottom: -100%;
  width: 100%;
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}`}/>
  </div>);
};
