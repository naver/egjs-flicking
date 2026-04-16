import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

export default function App() {
  const flickingRef = React.useRef(null);
  const { currentPanelIndex, totalPanelCount, moveTo } = useFlickingReactiveAPI(flickingRef);

  return (
    <div>
      <Flicking ref={flickingRef}>
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
            {index + 1}
          </div>
        ))}
      </Flicking>

      <div className="pagination">
        {Array.from({ length: totalPanelCount }, (_, i) => (
          <button
            key={i}
            className={`pagination-btn ${currentPanelIndex === i ? "active" : ""}`}
            onClick={() => moveTo(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
