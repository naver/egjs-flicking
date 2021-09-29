import * as React from "react";
import Flicking from "../../react-flicking/Flicking";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [num, setNum] = React.useState(1);

  return (
    <div className="container">
      <h1>virtual</h1>
      <button onClick={() => setNum(num + 1)}>{ num }</button>
      <Flicking className="flicking flicking0" panelsPerView={5} virtual={{
        panelClass: "panel",
        renderPanel: (panel) => `Panel ${panel.index}`,
        initialPanelCount: 100
      }} />
    </div>);
}
