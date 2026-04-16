import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useState } from "react";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

export default function App() {
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
  const [counter, setCounter] = useState(5);

  const handlePrepend = () => {
    setPanels(prev => [counter, ...prev]);
    setCounter(c => c + 1);
  };

  const handleAppend = () => {
    setPanels(prev => [...prev, counter]);
    setCounter(c => c + 1);
  };

  const handleRemoveFirst = () => {
    if (panels.length > 1) {
      setPanels(prev => prev.slice(1));
    }
  };

  const handleRemoveLast = () => {
    if (panels.length > 1) {
      setPanels(prev => prev.slice(0, -1));
    }
  };

  return (
    <div>
      <Flicking renderOnlyVisible={true} align="prev" bound={true}>
        {panels.map(i => (
          <div className="flicking-panel" key={i} style={{ background: COLORS[i % COLORS.length] }}>
            {i}
          </div>
        ))}
      </Flicking>
      <div className="controls">
        <button className="button" onClick={handlePrepend}>
          Prepend
        </button>
        <button className="button" onClick={handleAppend}>
          Append
        </button>
        <button className="button danger" onClick={handleRemoveFirst}>
          Remove First
        </button>
        <button className="button danger" onClick={handleRemoveLast}>
          Remove Last
        </button>
      </div>
      <div className="info-bar">Panel count: {panels.length}</div>
    </div>
  );
}
