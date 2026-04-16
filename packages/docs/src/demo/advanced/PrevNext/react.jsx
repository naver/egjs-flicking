import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useRef } from "react";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

export default function App() {
  const flickingRef = useRef(null);
  const { currentPanelIndex, totalPanelCount, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);

  return (
    <div>
      <Flicking ref={flickingRef} align="center">
        {COLORS.map((color, i) => (
          <div className="flicking-panel" key={i} style={{ background: color }}>
            {i + 1}
          </div>
        ))}
      </Flicking>
      <div className="nav-controls">
        <button className="nav-btn" disabled={isReachStart} onClick={() => moveTo(currentPanelIndex - 1)}>
          ← Prev
        </button>
        <span className="nav-info">
          {currentPanelIndex + 1} / {totalPanelCount}
        </span>
        <button className="nav-btn" disabled={isReachEnd} onClick={() => moveTo(currentPanelIndex + 1)}>
          Next →
        </button>
      </div>
    </div>
  );
}
