import Flicking, { VirtualPanel } from "@egjs/react-flicking";
import { useEffect, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const TOTAL_PANELS = 1000;
const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default function App() {
  const normalFlickingRef = useRef(null);
  const virtualFlickingRef = useRef(null);
  const [normalDomCount, setNormalDomCount] = useState(0);
  const [virtualDomCount, setVirtualDomCount] = useState(0);

  // Update DOM element count
  const updateDomCounts = () => {
    if (normalFlickingRef.current) {
      const panels = normalFlickingRef.current.element.querySelectorAll(".flicking-panel");
      setNormalDomCount(panels.length);
    }
    if (virtualFlickingRef.current) {
      const panels = virtualFlickingRef.current.element.querySelectorAll(".flicking-panel");
      setVirtualDomCount(panels.length);
    }
  };

  useEffect(() => {
    updateDomCounts();
  }, [updateDomCounts]);

  // Normal mode panel array (100 only - 1000 causes memory issues)
  const normalPanels = Array.from({ length: 100 }, (_, i) => ({
    index: i,
    color: COLORS[i % COLORS.length]
  }));

  return (
    <div>
      {/* Virtual mode: 1000 panels */}
      <div className="demo-container">
        <div className="demo-label">virtual enabled (1000 panels)</div>
        <div className="demo-info">Only panelsPerView + 1 DOM elements are maintained</div>
        <Flicking
          ref={virtualFlickingRef}
          align="prev"
          panelsPerView={3}
          virtual={{
            renderPanel: (panel, index) => `<div class="panel-inner color-${index % 7}">Panel ${index + 1}</div>`,
            initialPanelCount: TOTAL_PANELS,
            cache: true,
            panelClass: "flicking-panel"
          }}
          onMove={() => updateDomCounts()}
        />
        <div className="dom-counter">
          Total <strong>{TOTAL_PANELS}</strong> panels, DOM elements: <strong>{virtualDomCount}</strong>
        </div>
      </div>

      {/* Normal mode: 100 panels (for comparison) */}
      <div className="demo-container">
        <div className="demo-label">virtual disabled (100 panels - for comparison)</div>
        <div className="demo-info">All panels exist in the DOM</div>
        <Flicking ref={normalFlickingRef} align="prev" onReady={() => updateDomCounts()}>
          {normalPanels.map(panel => (
            <div key={panel.index} className="flicking-panel" style={{ background: panel.color }}>
              Panel {panel.index + 1}
            </div>
          ))}
        </Flicking>
        <div className="dom-counter">
          Total <strong>{normalPanels.length}</strong> panels = DOM elements: <strong>{normalDomCount}</strong>
        </div>
      </div>
    </div>
  );
}
