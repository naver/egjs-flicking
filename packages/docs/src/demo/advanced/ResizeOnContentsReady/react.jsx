import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

// Use various widths so panel size depends on images
// Cache-busting to load new images each time (no difference when cached)
const t = Date.now();
const IMAGES = [
  `https://picsum.photos/300/150?t=${t}&r=1`,
  `https://picsum.photos/200/150?t=${t}&r=2`,
  `https://picsum.photos/400/150?t=${t}&r=3`,
  `https://picsum.photos/250/150?t=${t}&r=4`
];

export default function App() {
  const autoRef = useRef(null);
  const manualRef = useRef(null);
  const [autoSizes, setAutoSizes] = useState("-");
  const [manualSizes, setManualSizes] = useState("-");

  const updateSizes = () => {
    setTimeout(() => {
      try {
        if (autoRef.current) {
          setAutoSizes(autoRef.current.panels.map(p => Math.round(p.size)).join(", "));
        }
        if (manualRef.current) {
          setManualSizes(manualRef.current.panels.map(p => Math.round(p.size)).join(", "));
        }
      } catch (_e) {
        /* ignore */
      }
    }, 500);
  };

  const moveToPanel = index => {
    if (autoRef.current) autoRef.current.moveTo(index, 500).catch(() => {});
    if (manualRef.current) manualRef.current.moveTo(index, 500).catch(() => {});
  };

  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">resizeOnContentsReady: true</div>
        <div className="demo-info">Auto-recalculates panel size & position after image load → correct scrolling</div>
        <Flicking
          ref={autoRef}
          align="prev"
          resizeOnContentsReady={true}
          preventDefaultOnDrag={true}
          bound={true}
          onReady={() => updateSizes()}
        >
          {IMAGES.map((src, i) => (
            <div key={i} className="flicking-panel">
              <img src={src} alt={`Panel ${i + 1}`} onLoad={() => updateSizes()} />
              <div className="panel-label">Panel {i + 1}</div>
            </div>
          ))}
        </Flicking>
        <div className="status-display">
          Flicking internal panel widths: <strong>[{autoSizes}]</strong>
        </div>
      </div>

      <div className="demo-container">
        <div className="demo-label">resizeOnContentsReady: false (default)</div>
        <div className="demo-info">Panel sizes not recalculated → size mismatch, incorrect scroll position</div>
        <Flicking
          ref={manualRef}
          align="prev"
          resizeOnContentsReady={false}
          preventDefaultOnDrag={true}
          bound={true}
          onReady={() => updateSizes()}
        >
          {IMAGES.map((src, i) => (
            <div key={i} className="flicking-panel">
              <img src={src} alt={`Panel ${i + 1}`} onLoad={() => updateSizes()} />
              <div className="panel-label">Panel {i + 1}</div>
            </div>
          ))}
        </Flicking>
        <div className="status-display">
          Flicking internal panel widths: <strong>[{manualSizes}]</strong>
        </div>
      </div>

      <div className="controls">
        <button className="button" onClick={() => moveToPanel(0)}>
          Panel 1
        </button>
        <button className="button" onClick={() => moveToPanel(1)}>
          Panel 2
        </button>
        <button className="button" onClick={() => moveToPanel(2)}>
          Panel 3
        </button>
        <button className="button" onClick={() => moveToPanel(3)}>
          Panel 4
        </button>
      </div>
    </div>
  );
}
