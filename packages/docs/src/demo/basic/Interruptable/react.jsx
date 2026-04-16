import Flicking from "@egjs/react-flicking";
import { useRef } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  return (
    <div>
      {/* interruptable: true (default) */}
      <div className="demo-container">
        <div className="demo-label">interruptable: true (default — drag during animation)</div>
        <Flicking ref={ref1} duration={2000} align="center" interruptable={true}>
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={() => ref1.current?.next().catch(() => {})}>Next (start 2s animation)</button>
        </div>
        <div className="demo-hint">Drag during animation to interrupt it immediately</div>
      </div>

      {/* interruptable: false */}
      <div className="demo-container">
        <div className="demo-label">interruptable: false (ignores drag until animation ends)</div>
        <Flicking ref={ref2} duration={2000} align="center" interruptable={false}>
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={() => ref2.current?.next().catch(() => {})}>Next (start 2s animation)</button>
        </div>
        <div className="demo-hint">Drag is ignored until the animation completes</div>
      </div>
    </div>
  );
}
