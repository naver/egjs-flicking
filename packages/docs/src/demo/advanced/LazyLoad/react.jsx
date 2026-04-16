import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useCallback, useState } from "react";

const TOTAL = 100;
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const getImageUrl = i => `https://picsum.photos/seed/${i}/250/180`;

export default function App() {
  const [loadedSet, setLoadedSet] = useState(new Set());
  const [loadedCount, setLoadedCount] = useState(0);

  const handleVisibleChange = useCallback(e => {
    setLoadedSet(prev => {
      const next = new Set(prev);
      e.added.forEach(panel => next.add(panel.index));
      const newCount = next.size;
      setLoadedCount(newCount);
      return next;
    });
  }, []);

  const handleReady = useCallback(e => {
    const visiblePanels = e.currentTarget.visiblePanels;
    setLoadedSet(prev => {
      const next = new Set(prev);
      visiblePanels.forEach(panel => next.add(panel.index));
      setLoadedCount(next.size);
      return next;
    });
  }, []);

  return (
    <div>
      <Flicking
        renderOnlyVisible={true}
        align="prev"
        bound={true}
        preventDefaultOnDrag={true}
        onReady={handleReady}
        onVisibleChange={handleVisibleChange}
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <div className="flicking-panel" key={i} style={{ background: COLORS[i % COLORS.length] }}>
            {loadedSet.has(i) ? (
              <img src={getImageUrl(i)} alt={`Panel ${i}`} />
            ) : (
              <div className="placeholder">Panel {i}</div>
            )}
          </div>
        ))}
      </Flicking>
      <div className="info-bar">
        Images loaded: {loadedCount} / {TOTAL}
        (only visible panels are loaded)
      </div>
    </div>
  );
}
