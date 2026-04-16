import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#48c78e", "#f14668", "#ffe08a"];

export default function App() {
  return (
    <div>
      <div className="demo-container">
        <div className="demo-label">useFractionalSize: false (default)</div>
        <Flicking useFractionalSize={false} defaultIndex={2} style={{ width: "200px" }}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ width: "199.5px", height: "200px", background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>

      <div className="demo-container">
        <div className="demo-label">useFractionalSize: true</div>
        <Flicking useFractionalSize={true} defaultIndex={2} style={{ width: "200px" }}>
          {COLORS.map((color, i) => (
            <div key={i} className="flicking-panel" style={{ width: "199.5px", height: "200px", background: color }}>
              {i + 1}
            </div>
          ))}
        </Flicking>
      </div>
    </div>
  );
}
