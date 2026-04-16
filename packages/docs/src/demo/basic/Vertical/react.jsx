import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

export default function App() {
  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">horizontal: true (default)</div>
        <Flicking horizontal={true} align="prev" bound={true}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-container">
        <div className="demo-label">horizontal: false (vertical)</div>
        <Flicking horizontal={false} align="prev" bound={true}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}
