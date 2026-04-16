import Flicking from "@egjs/react-flicking";
import { useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      {/* preventClickOnDrag: true (default) */}
      <div className="demo-container">
        <div className="demo-label">preventClickOnDrag: true (default)</div>
        <Flicking align="center" preventClickOnDrag={true}>
          <div className="flicking-panel panel-1" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-2" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-3" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-4" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-5" onClick={() => setCount1(c => c + 1)}>
            click
          </div>
        </Flicking>
        <div className="click-count">Click count: {count1}</div>
        <div className="demo-hint">Click after drag is ignored. Count increases only on pure tap/click.</div>
      </div>

      {/* preventClickOnDrag: false */}
      <div className="demo-container">
        <div className="demo-label">preventClickOnDrag: false</div>
        <Flicking align="center" preventClickOnDrag={false}>
          <div className="flicking-panel panel-1" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-2" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-3" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-4" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
          <div className="flicking-panel panel-5" onClick={() => setCount2(c => c + 1)}>
            click
          </div>
        </Flicking>
        <div className="click-count">Click count: {count2}</div>
        <div className="demo-hint">Click event fires even after drag release.</div>
      </div>
    </div>
  );
}
