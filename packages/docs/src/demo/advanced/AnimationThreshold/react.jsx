import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function FlickingDemo({ label, animationThreshold, duration }) {
  const ref = useRef(null);
  const [log, setLog] = useState("—");

  const addLog = msg => setLog(msg);

  return (
    <div className="demo-container">
      <div className="demo-label">{label}</div>
      <Flicking
        ref={ref}
        duration={duration}
        animationThreshold={animationThreshold}
        align="center"
        onWillChange={() => addLog("▶ Animation started")}
        onMoveEnd={() => addLog("✓ Move complete")}
      >
        <div className="flicking-panel panel-1">1</div>
        <div className="flicking-panel panel-2">2</div>
        <div className="flicking-panel panel-3">3</div>
        <div className="flicking-panel panel-4">4</div>
        <div className="flicking-panel panel-5">5</div>
      </Flicking>
      <div className="controls">
        <button onClick={() => ref.current?.prev().catch(() => {})}>Prev</button>
        <button onClick={() => ref.current?.next().catch(() => {})}>Next</button>
        <span className="event-log">{log}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FlickingDemo
        label="animationThreshold: 0.5 (default) — normal animation"
        animationThreshold={0.5}
        duration={1000}
      />
      <FlickingDemo
        label="animationThreshold: 300 — moves under 300px are instant (no animation)"
        animationThreshold={300}
        duration={1000}
      />
    </div>
  );
}
