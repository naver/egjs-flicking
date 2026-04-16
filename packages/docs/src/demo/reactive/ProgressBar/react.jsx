import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];

export default function App() {
  const flickingRef = React.useRef(null);
  const { progress } = useFlickingReactiveAPI(flickingRef);

  return (
    <div style={{ width: "100%" }}>
      <Flicking ref={flickingRef} moveType="freeScroll">
        {[0, 1, 2, 3, 4].map(index => (
          <div key={index} className="flicking-panel" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
            {index + 1}
          </div>
        ))}
      </Flicking>

      <div className="progress-container">
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">Progress: {progress.toFixed(1)}%</div>
      </div>
    </div>
  );
}
