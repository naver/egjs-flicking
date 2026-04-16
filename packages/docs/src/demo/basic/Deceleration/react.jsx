import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* deceleration: 0.001 (long inertia) */}
      <div className="demo-container">
        <div className="demo-label">deceleration: 0.001 (long inertia, travels far)</div>
        <Flicking deceleration={0.001} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* deceleration: 0.0075 (default) */}
      <div className="demo-container">
        <div className="demo-label">deceleration: 0.0075 (default)</div>
        <Flicking deceleration={0.0075} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* deceleration: 0.05 (short inertia) */}
      <div className="demo-container">
        <div className="demo-label">deceleration: 0.05 (short inertia, stops quickly)</div>
        <Flicking deceleration={0.05} align="center">
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
