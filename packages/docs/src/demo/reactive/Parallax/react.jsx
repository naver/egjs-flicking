import Flicking, { useFlickingReactiveAPI } from "@egjs/react-flicking";
import React from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const OFFSETS = [180, 160, 140, 120, 100];
const SIZES = ["size4", "size1", "size3", "size2", "size3"];

export default function App() {
  const flickingRef = React.useRef(null);
  const { indexProgress } = useFlickingReactiveAPI(flickingRef);

  return (
    <Flicking ref={flickingRef}>
      {[0, 1, 2, 3, 4].map(panelIndex => {
        const childProgress = panelIndex - indexProgress;
        const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);

        return (
          <div key={panelIndex} className="skeleton-panel">
            {SIZES.map((size, i) => (
              <span
                key={i}
                className={`skeleton-bar skeleton-bar-${size}`}
                style={{
                  transform: `translateX(${childProgress * OFFSETS[i]}px)`,
                  opacity
                }}
              />
            ))}
          </div>
        );
      })}
    </Flicking>
  );
}
