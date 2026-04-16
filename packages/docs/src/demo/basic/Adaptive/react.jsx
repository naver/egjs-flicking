import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* adaptive: false (default) */}
      <div className="demo-container">
        <div className="demo-label">adaptive: false (default, fixed height)</div>
        <Flicking adaptive={false} align="center">
          <div className="flicking-panel panel-1">Height 80px</div>
          <div className="flicking-panel panel-2">Height 150px</div>
          <div className="flicking-panel panel-3">Height 100px</div>
          <div className="flicking-panel panel-4">Height 200px</div>
          <div className="flicking-panel panel-5">Height 120px</div>
        </Flicking>
      </div>

      {/* adaptive: true */}
      <div className="demo-container">
        <div className="demo-label">adaptive: true (viewport adjusts to panel height)</div>
        <Flicking adaptive={true} align="center">
          <div className="flicking-panel panel-1">Height 80px</div>
          <div className="flicking-panel panel-2">Height 150px</div>
          <div className="flicking-panel panel-3">Height 100px</div>
          <div className="flicking-panel panel-4">Height 200px</div>
          <div className="flicking-panel panel-5">Height 120px</div>
        </Flicking>
      </div>
    </div>
  );
}
