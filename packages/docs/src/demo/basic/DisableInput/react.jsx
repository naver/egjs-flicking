import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

export default function App() {
  const flickingRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleInput = () => {
    if (flickingRef.current) {
      if (isDisabled) {
        flickingRef.current.enableInput();
      } else {
        flickingRef.current.disableInput();
      }
      setIsDisabled(!isDisabled);
    }
  };

  return (
    <div>
      {/* disableOnInit: false (default) */}
      <div className="demo-container">
        <div className="demo-label">disableOnInit: false (default, drag enabled)</div>
        <Flicking disableOnInit={false} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* disableOnInit: true */}
      <div className="demo-container">
        <div className="demo-label">disableOnInit: true (drag disabled, button control only)</div>
        <Flicking disableOnInit={true} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
      </div>

      {/* dynamic toggle */}
      <div className="demo-container">
        <div className="demo-label">Dynamic toggle: {isDisabled ? "disabled" : "enabled"}</div>
        <Flicking ref={flickingRef} align="center">
          <div className="flicking-panel panel-1">1</div>
          <div className="flicking-panel panel-2">2</div>
          <div className="flicking-panel panel-3">3</div>
          <div className="flicking-panel panel-4">4</div>
          <div className="flicking-panel panel-5">5</div>
        </Flicking>
        <div className="controls">
          <button onClick={toggleInput}>{isDisabled ? "Enable input" : "Disable input"}</button>
        </div>
      </div>
    </div>
  );
}
