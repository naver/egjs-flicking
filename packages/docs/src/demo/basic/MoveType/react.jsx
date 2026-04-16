import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* moveType: "snap" (default) */}
      <div className="demo-container">
        <div className="demo-label">moveType: "snap" (default)</div>
        <Flicking moveType="snap" align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* moveType: "freeScroll" */}
      <div className="demo-container">
        <div className="demo-label">moveType: "freeScroll" (free scroll)</div>
        <Flicking moveType="freeScroll" align="center" bound={true}>
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* moveType: "strict" */}
      <div className="demo-container">
        <div className="demo-label">moveType: "strict" (one panel at a time)</div>
        <Flicking moveType="strict" align="center">
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
