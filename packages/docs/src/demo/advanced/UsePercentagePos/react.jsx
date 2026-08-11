import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const PANELS = [1, 2, 3, 4, 5];

function DemoSection({ label, usePercentagePos, width, flickingRef }) {
  const [transform, setTransform] = useState("");

  const updateTransform = e => {
    setTransform(e.currentTarget.camera.element.style.transform);
  };

  return (
    <div className="demo-section">
      <div className="demo-label">{label}</div>
      <div style={{ width }}>
        {/* autoResize is disabled to simulate the moment before resize() is applied */}
        <Flicking
          ref={flickingRef}
          usePercentagePos={usePercentagePos}
          autoResize={false}
          defaultIndex={2}
          onReady={updateTransform}
          onMove={updateTransform}
          onAfterResize={updateTransform}
        >
          {PANELS.map(num => (
            <div key={num} className={`flicking-panel panel-${num}`}>
              {num}
            </div>
          ))}
        </Flicking>
      </div>
      <div className="transform-bar">
        transform: <span>{transform}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [narrow, setNarrow] = useState(false);
  const flickingPx = useRef(null);
  const flickingPercent = useRef(null);
  const width = narrow ? "60%" : "100%";

  const callResize = () => {
    flickingPx.current?.resize();
    flickingPercent.current?.resize();
  };

  return (
    <div>
      <div className="demo-hint">
        1. Toggle the container width — the px-positioned carousel gets misaligned, while the %-positioned one keeps its
        place.
        <br />
        2. Call resize() to recalculate the internal sizes and fix the misalignment.
      </div>

      <div className="controls">
        <button className="button" onClick={() => setNarrow(!narrow)}>
          Toggle width
        </button>
        <button className="button" onClick={callResize}>
          Call resize()
        </button>
        <span className="value-label">width: {width}</span>
      </div>

      <DemoSection
        label="usePercentagePos: false (default)"
        usePercentagePos={false}
        width={width}
        flickingRef={flickingPx}
      />
      <DemoSection label="usePercentagePos: true" usePercentagePos={true} width={width} flickingRef={flickingPercent} />
    </div>
  );
}
