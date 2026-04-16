import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const flickingRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInit = () => {
    if (flickingRef.current && !isInitialized) {
      flickingRef.current.init();
      setIsInitialized(true);
    }
  };

  return (
    <div>
      {/* autoInit: true (default) */}
      <div className="demo-container">
        <div className="demo-label">autoInit: true (default, initializes immediately)</div>
        <Flicking autoInit={true} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* autoInit: false (manual init) */}
      <div className="demo-container">
        <div className="demo-label">autoInit: false (initialize on button click)</div>
        <Flicking ref={flickingRef} autoInit={false} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={handleInit} disabled={isInitialized}>
            {isInitialized ? "Initialized" : "Call init()"}
          </button>
        </div>
        <div className="status">
          Status: {isInitialized ? "initialized - drag enabled" : "not initialized - drag disabled"}
        </div>
      </div>
    </div>
  );
}
