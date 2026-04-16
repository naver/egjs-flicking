import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

export default function App() {
  const flickingRef = React.useRef(null);
  const { currentPanelIndex, isReachStart, isReachEnd, moveTo } = useFlickingReactiveAPI(flickingRef);

  const handlePrev = () => {
    if (!isReachStart) {
      moveTo(currentPanelIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isReachEnd) {
      moveTo(currentPanelIndex + 1);
    }
  };

  return (
    <div>
      <Flicking ref={flickingRef}>
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
            {index + 1}
          </div>
        ))}
      </Flicking>

      <div className="controls">
        <button className="nav-btn" onClick={handlePrev} disabled={isReachStart}>
          Prev
        </button>
        <button className="nav-btn" onClick={handleNext} disabled={isReachEnd}>
          Next
        </button>
      </div>
    </div>
  );
}
