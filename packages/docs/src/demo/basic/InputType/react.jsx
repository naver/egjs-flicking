import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* inputType: ["touch", "mouse"] (default) */}
      <div className="demo-container">
        <div className="demo-label">inputType: ["touch", "mouse"] (default)</div>
        <Flicking inputType={["touch", "mouse"]} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* inputType: ["touch"] */}
      <div className="demo-container">
        <div className="demo-label">inputType: ["touch"] (touch only, no mouse drag)</div>
        <Flicking inputType={["touch"]} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* inputType: ["mouse"] */}
      <div className="demo-container">
        <div className="demo-label">inputType: ["mouse"] (mouse only, no touch)</div>
        <Flicking inputType={["mouse"]} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>
    </div>
  );
}
