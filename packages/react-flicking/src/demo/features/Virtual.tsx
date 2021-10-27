import * as React from "react";
import Flicking from "../../react-flicking/Flicking";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [num, setNum] = React.useState(1);
  const flicking = React.useRef<Flicking>();
  const virtual = React.useMemo(() => ({
    cache: true,
    panelClass: "panel",
    renderPanel: (panel) => `<span>Panel ${panel.index}</span>`,
    initialPanelCount: 100
  }), []);

  return (
    <div className="container">
      <h1>virtual</h1>
      <button onClick={() => setNum(num + 1)}>{ num }</button>
      <Flicking ref={flicking as any} className="flicking flicking0" panelsPerView={5} circular={true} virtual={virtual} />
      <button onClick={() => {
        flicking.current?.virtual.prepend(100);
      }}>PREPEND</button>
      <button onClick={() => {
        flicking.current?.virtual.append(100);
      }}>APPEND</button>
    </div>);
}
