import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const PANEL_COUNT = 200;
const PANELS = Array.from({ length: PANEL_COUNT }, (_, i) => i + 1);
const HEIGHTS = ["panel-h120", "panel-h130", "panel-h140", "panel-h150", "panel-h160"];
const HEIGHT_LABELS = [120, 130, 140, 150, 160];

export default function App() {
  return (
    <div>
      <div className="demo-hint">
        <strong>autoResize: true + renderOnlyVisible: true</strong> with 200 panels of varying heights.
        <br />
        Swipe through the panels and compare the <strong>flickering</strong> between the two carousels.
      </div>

      <div className="demo-section">
        <div className="demo-label">optimizeSizeUpdate: false (default)</div>
        <Flicking renderOnlyVisible={true} autoResize={true} optimizeSizeUpdate={false}>
          {PANELS.map(n => (
            <div key={n} className={`flicking-panel ${HEIGHTS[(n - 1) % 5]}`}>
              Panel {n} ({HEIGHT_LABELS[(n - 1) % 5]}px)
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-section">
        <div className="demo-label">optimizeSizeUpdate: true</div>
        <Flicking renderOnlyVisible={true} autoResize={true} optimizeSizeUpdate={true}>
          {PANELS.map(n => (
            <div key={n} className={`flicking-panel ${HEIGHTS[(n - 1) % 5]}`}>
              Panel {n} ({HEIGHT_LABELS[(n - 1) % 5]}px)
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}
