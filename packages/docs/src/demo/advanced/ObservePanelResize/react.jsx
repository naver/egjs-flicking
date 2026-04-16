import Flicking from "@egjs/react-flicking";
import { useRef } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function setupButtons(flicking) {
  flicking.panels.forEach(panel => {
    const btn = panel.element.querySelector(".expand-btn");
    if (!btn) return;
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const isWide = panel.element.style.width === "70%";
      panel.element.style.width = isWide ? "40%" : "70%";
      btn.textContent = isWide ? "Expand" : "Shrink";
    });
  });
}

function FlickingDemo({ label, observePanelResize, hint }) {
  const ref = useRef(null);
  return (
    <div className="demo-container">
      <div className="demo-label">{label}</div>
      <Flicking
        ref={ref}
        align="center"
        observePanelResize={observePanelResize}
        onReady={() => setupButtons(ref.current)}
      >
        <div className="flicking-panel panel-1" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 1</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-2" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 2</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-3" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 3</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-4" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 4</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
        <div className="flicking-panel panel-5" style={{ width: "40%" }}>
          <div className="panel-inner">
            <span>Panel 5</span>
            <button className="expand-btn">Expand</button>
          </div>
        </div>
      </Flicking>
      <div className="demo-hint">{hint}</div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FlickingDemo
        label="observePanelResize: false (default)"
        observePanelResize={false}
        hint="Flicking does not detect panel resizing, causing misaligned layout"
      />
      <FlickingDemo
        label="observePanelResize: true"
        observePanelResize={true}
        hint="Flicking automatically recalculates layout when panels are resized"
      />
    </div>
  );
}
