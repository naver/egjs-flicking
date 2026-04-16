import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  return (
    <div>
      {/* nested: false */}
      <div className="demo-container">
        <div className="demo-label">nested: false (parent does not move at inner boundary)</div>
        <div className="demo-hint">The outer Flicking does not move when the inner one reaches its end</div>
        <Flicking align="center">
          <div className="outer-panel outer-1">
            <Flicking className="inner-viewport" nested={false} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-2">
            <Flicking className="inner-viewport" nested={false} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-3">
            <Flicking className="inner-viewport" nested={false} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
        </Flicking>
      </div>

      {/* nested: true */}
      <div className="demo-container">
        <div className="demo-label">nested: true (propagates to parent at inner boundary)</div>
        <div className="demo-hint">The outer Flicking moves when the inner one reaches its end</div>
        <Flicking align="center">
          <div className="outer-panel outer-1">
            <Flicking className="inner-viewport" nested={true} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-2">
            <Flicking className="inner-viewport" nested={true} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
          <div className="outer-panel outer-3">
            <Flicking className="inner-viewport" nested={true} align="center" bound={true}>
              <div className="inner-panel">Inner 1</div>
              <div className="inner-panel">Inner 2</div>
              <div className="inner-panel">Inner 3</div>
            </Flicking>
          </div>
        </Flicking>
      </div>
    </div>
  );
}
