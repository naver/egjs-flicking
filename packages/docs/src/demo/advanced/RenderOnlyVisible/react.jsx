import Flicking from "@egjs/react-flicking";
import { useCallback, useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const TOTAL = 20;
const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

export default function App() {
  const visibleRef = useRef(null);
  const normalRef = useRef(null);
  const [visibleDomCount, setVisibleDomCount] = useState(0);
  const [normalDomCount, setNormalDomCount] = useState(0);

  const updateCounts = useCallback(() => {
    if (visibleRef.current) {
      setVisibleDomCount(visibleRef.current.camera.element.children.length);
    }
    if (normalRef.current) {
      setNormalDomCount(normalRef.current.camera.element.children.length);
    }
  }, []);

  const panels = Array.from({ length: TOTAL }, (_, i) => (
    <div key={i} className="flicking-panel" style={{ background: COLORS[i % COLORS.length] }}>
      Panel {i + 1}
    </div>
  ));

  return (
    <div>
      {/* renderOnlyVisible: true */}
      <div className="demo-container">
        <div className="demo-label">renderOnlyVisible: true</div>
        <div className="demo-info">Non-visible panels are removed from the DOM. Try scrolling.</div>
        <Flicking
          ref={visibleRef}
          align="prev"
          renderOnlyVisible={true}
          onReady={updateCounts}
          onVisibleChange={updateCounts}
        >
          {panels}
        </Flicking>
        <div className="dom-counter">
          DOM panel count: <strong>{visibleDomCount}</strong> / {TOTAL} panels
        </div>
      </div>

      {/* renderOnlyVisible: false */}
      <div className="demo-container">
        <div className="demo-label">renderOnlyVisible: false (default)</div>
        <div className="demo-info">All panels are always present in the DOM.</div>
        <Flicking ref={normalRef} align="prev" renderOnlyVisible={false} onReady={updateCounts}>
          {panels}
        </Flicking>
        <div className="dom-counter">
          DOM panel count: <strong>{normalDomCount}</strong> / {TOTAL} panels
        </div>
      </div>
    </div>
  );
}
