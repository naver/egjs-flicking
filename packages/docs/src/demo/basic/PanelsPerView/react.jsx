import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* panelsPerView: -1 (default, manual sizing) */}
      <div className="demo-container">
        <div className="demo-label">panelsPerView: -1 (default, manual panel sizing)</div>
        <Flicking className="manual-size" panelsPerView={-1} align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* panelsPerView: 3 */}
      <div className="demo-container">
        <div className="demo-label">panelsPerView: 3 (auto-sized to show 3 panels)</div>
        <Flicking panelsPerView={3} align="prev">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* panelsPerView: 1 */}
      <div className="demo-container">
        <div className="demo-label">panelsPerView: 1 (fullscreen slider)</div>
        <Flicking panelsPerView={1} align="center">
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
