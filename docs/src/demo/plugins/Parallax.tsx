/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import Flicking from "@egjs/react-flicking";
import { Parallax } from "@egjs/flicking-plugins";

export default () => {
  const plugins = [new Parallax("img")];

  return (<Flicking className="parallax mb-2" plugins={plugins} circular={true}>
    <div className="plugins-panel has-background-primary has-text-white is-size-1">
      <img className="panel-image" src={require("@site/static/img/demo/bg01.jpg").default} />
    </div>
    <div className="plugins-panel has-background-primary has-text-white is-size-1">
      <img className="panel-image" src={require("@site/static/img/demo/bg02.jpg").default} />
    </div>
    <div className="plugins-panel has-background-primary has-text-white is-size-1">
      <img className="panel-image" src={require("@site/static/img/demo/bg03.jpg").default} />
    </div>
  </Flicking>);
};
