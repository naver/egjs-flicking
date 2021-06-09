import React from "react";
import Flicking from "@egjs/react-flicking";

import Panel from "../component/Panel";

export default () => {
  const flickingRef = React.createRef<Flicking>();

  return (<><Flicking autoInit={false} ref={flickingRef}>
    <Panel index={0} />
    <Panel index={1} />
    <Panel index={2} />
    <Panel index={3} />
    <Panel index={4} />
  </Flicking>
  <button className="button is-fullwidth" onClick={() => {
    console.log(flickingRef.current.props.children);
    flickingRef.current.init();
  }}>Call init()</button></>);
};
