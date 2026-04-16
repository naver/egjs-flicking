import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useRef } from "react";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];
const LENGTH = COLORS.length;

export default function App() {
  const flickingRef = useRef(null);
  const { indexProgress } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef} circular={true} align="center">
      {COLORS.map((color, i) => {
        const childProgress = ((i - indexProgress + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
        const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);
        const rotateY = -childProgress * 50;

        return (
          <div
            className="flicking-panel"
            key={i}
            style={{
              background: color,
              transform: `rotateY(${rotateY}deg) scale(${scale})`,
              opacity: Math.max(0, 1 - Math.abs(childProgress) * 0.3)
            }}
          >
            {i + 1}
          </div>
        );
      })}
    </Flicking>
  );
}
