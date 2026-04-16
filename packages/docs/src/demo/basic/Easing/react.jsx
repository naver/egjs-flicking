import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

// Easing functions
const linear = x => x;
const easeOutCubic = x => 1 - (1 - x) ** 3;
const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

export default function App() {
  return (
    <div>
      {/* linear */}
      <div className="demo-container">
        <div className="demo-label">easing: linear (constant speed)</div>
        <Flicking easing={linear} duration={800} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* easeOutCubic (default) */}
      <div className="demo-container">
        <div className="demo-label">easing: easeOutCubic (default, fast start → slow end)</div>
        <Flicking easing={easeOutCubic} duration={800} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* easeInOutQuad */}
      <div className="demo-container">
        <div className="demo-label">easing: easeInOutQuad (slow start → fast → slow end)</div>
        <Flicking easing={easeInOutQuad} duration={800} align="center">
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
