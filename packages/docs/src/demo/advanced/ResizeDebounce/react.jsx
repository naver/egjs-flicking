import Flicking from "@egjs/react-flicking";
import { useCallback, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function formatTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
  });
}

function FlickingDemo({ label, config, width }) {
  const [logs, setLogs] = useState([]);

  const onAfterResize = useCallback(() => {
    setLogs(prev => [`[${formatTime()}] resize()`, ...prev].slice(0, 30));
  }, []);

  return (
    <div className="demo-section">
      <div className="demo-label">{label}</div>
      <div style={{ width }}>
        <Flicking
          resizeDebounce={config.resizeDebounce}
          maxResizeDebounce={config.maxResizeDebounce}
          onAfterResize={onAfterResize}
        >
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div className="log-header">
        <span>Resize log</span>
        <span className="count-badge">{logs.length}x</span>
      </div>
      <div className="log-area">
        {logs.length === 0 ? "Move the slider to see resize logs..." : logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}

export default function App() {
  const [width, setWidth] = useState(100);

  return (
    <div>
      <div className="demo-hint">
        Change the width using the slider and compare the resize call frequency between the two carousels.
      </div>

      <div className="slider-row">
        <span>Container width</span>
        <input type="range" min={30} max={100} value={width} onChange={e => setWidth(Number(e.target.value))} />
        <span className="value-label">{width}%</span>
      </div>

      <FlickingDemo
        label="resizeDebounce: 0 (default)"
        config={{ resizeDebounce: 0, maxResizeDebounce: 100 }}
        width={`${width}%`}
      />
      <FlickingDemo
        label="resizeDebounce: 300ms / maxResizeDebounce: 800ms"
        config={{ resizeDebounce: 300, maxResizeDebounce: 800 }}
        width={`${width}%`}
      />
    </div>
  );
}
