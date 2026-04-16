import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];

export default function App() {
  const panels = COLORS.map((color, i) => (
    <div className="flicking-panel" key={i} style={{ background: color }}>
      {i + 1}
    </div>
  ));

  return (
    <div>
      <div className="demo-section">
        <div className="demo-label">circular + panelsPerView: 3 + align: "prev"</div>
        <Flicking circular={true} panelsPerView={3} align="prev">
          {panels}
        </Flicking>
      </div>

      <div className="demo-section">
        <div className="demo-label">circular + panelsPerView: 1 + align: "center"</div>
        <Flicking circular={true} panelsPerView={1} align="center">
          {COLORS.map((color, i) => (
            <div className="flicking-panel" key={i} style={{ background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-section">
        <div className="demo-label">circular: false + panelsPerView: 3 (bounded slider)</div>
        <Flicking circular={false} panelsPerView={3} align="prev" bound={true}>
          {COLORS.map((color, i) => (
            <div className="flicking-panel" key={i} style={{ background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}
