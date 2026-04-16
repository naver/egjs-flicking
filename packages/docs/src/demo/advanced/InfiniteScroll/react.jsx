import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default function App() {
  const flickingRef = useRef(null);
  const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
  const [logs, setLogs] = useState([]);
  const nextId = useRef(5);

  const addLog = message => {
    setLogs(prev => [...prev.slice(-4), message]);
  };

  const handleNeedPanel = e => {
    addLog(`needPanel: direction=${e.direction}`);

    if (e.direction === "NEXT") {
      // NEXT: append panels
      const newPanels = [nextId.current, nextId.current + 1, nextId.current + 2];
      nextId.current += 3;
      setPanels(prev => [...prev, ...newPanels]);
      addLog(`Added: Panel ${newPanels.join(", ")}`);
    }
  };

  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">needPanelThreshold: 100</div>
        <div className="demo-info">needPanel event fires 100px before the end → panels are added automatically</div>
        <Flicking ref={flickingRef} align="prev" needPanelThreshold={100} onNeedPanel={handleNeedPanel}>
          {panels.map(id => (
            <div key={id} className="flicking-panel" style={{ background: COLORS[id % COLORS.length] }}>
              Panel {id + 1}
            </div>
          ))}
        </Flicking>
        <div className="panel-counter">
          Current panel count: <strong>{panels.length}</strong> (auto-appends on scroll to end)
        </div>
        <div className="event-log">
          {logs.length === 0 ? "Event log..." : logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </div>
    </div>
  );
}
