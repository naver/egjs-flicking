import React, { useState } from "react";
import Flicking from "@egjs/react-flicking";

export default () => {
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);

  return <>
    <Flicking className="py-4 mb-4" renderOnlyVisible={true}>
      {panels.map(panel => <div key={panel} className="flicking-panel has-text-white is-size-1 has-background-primary">{ panel }</div>)}
    </Flicking>
    <div className="block">
      <span className="button mr-2 is-info is-outlined" onClick={() => setPanels([panels[0] - 1, ...panels])}>Prepend</span>
      <span className="button mr-2 is-info is-outlined" onClick={() => setPanels([...panels, panels[panels.length - 1] + 1])}>Append</span>
    </div>
  </>;
};
