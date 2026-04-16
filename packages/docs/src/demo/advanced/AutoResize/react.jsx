import Flicking from "@egjs/react-flicking";
import { useCallback, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function FlickingDemo({ label, hint, width, useResizeObserver, autoResize }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  const onAfterResize = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div className="demo-section">
      <div className="demo-label">{label}</div>
      <div style={{ width }}>
        <Flicking
          ref={ref}
          key={`${autoResize}-${useResizeObserver}`}
          autoResize={autoResize}
          useResizeObserver={useResizeObserver}
          onAfterResize={onAfterResize}
        >
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
      <div className="resize-count">Resize count: {count}</div>
      <div className="resize-count" style={{ color: "#aaa" }}>
        {hint}
      </div>
      {!autoResize && (
        <button className="button" style={{ marginTop: 6 }} onClick={() => ref.current?.resize()}>
          Manual resize()
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [width, setWidth] = useState(100);
  const [autoResize, setAutoResize] = useState(true);

  return (
    <div>
      <div className="slider-row">
        <span>Container width</span>
        <input type="range" min={30} max={100} value={width} onChange={e => setWidth(Number(e.target.value))} />
        <span className="value-label">{width}%</span>
      </div>

      <FlickingDemo
        label="useResizeObserver: true"
        hint="Responds immediately when width is changed via slider"
        width={`${width}%`}
        useResizeObserver={true}
        autoResize={autoResize}
      />
      <FlickingDemo
        label="useResizeObserver: false"
        hint="Does not detect element size changes (only detects window resize)"
        width={`${width}%`}
        useResizeObserver={false}
        autoResize={autoResize}
      />

      <div className="toggle-row">
        <button className={`button ${autoResize ? "active" : ""}`} onClick={() => setAutoResize(v => !v)}>
          autoResize: {autoResize ? "true" : "false"}
        </button>
        <span style={{ fontSize: 13, color: "#888" }}>
          {autoResize ? "Auto resize enabled" : "Auto resize disabled — use the Manual resize() button"}
        </span>
      </div>
    </div>
  );
}
