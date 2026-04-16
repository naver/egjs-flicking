import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12"];
const LENGTH = 5;

export default function App() {
  const flickingRef = React.useRef(null);
  const { indexProgress } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef} circular={true} align="center" className="flicking-coverflow">
      {[0, 1, 2, 3, 4].map(index => {
        const childProgress = ((index - indexProgress + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
        const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

        return (
          <div
            key={index}
            className="flicking-panel"
            style={{
              backgroundColor: COLORS[index % COLORS.length],
              transformOrigin: `${50 - childProgress * 50}% 50%`,
              transform: `rotateY(${-childProgress * 50}deg) scale(${scale})`
            }}
          >
            {index + 1}
          </div>
        );
      })}
    </Flicking>
  );
}
