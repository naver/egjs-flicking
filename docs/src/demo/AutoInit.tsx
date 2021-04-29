/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import Flicking from "../../../packages/react-flicking/dist/flicking.esm";

export default () => {
  const flickingRef = React.createRef<typeof Flicking>();

  return (<><Flicking autoInit={false} ref={flickingRef}>
    <div className="flicking-panel has-background-primary has-text-white is-size-1">1</div>
    <div className="flicking-panel has-background-primary has-text-white is-size-1">2</div>
    <div className="flicking-panel has-background-primary has-text-white is-size-1">3</div>
    <div className="flicking-panel has-background-primary has-text-white is-size-1">4</div>
    <div className="flicking-panel has-background-primary has-text-white is-size-1">5</div>
  </Flicking>
  <button className="button is-fullwidth" onClick={() => {
    flickingRef.current.init();
  }}>Call init()</button></>);
};
