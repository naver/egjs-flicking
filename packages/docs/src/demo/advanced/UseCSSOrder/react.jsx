import Flicking from "@egjs/react-flicking";
import { useRef, useState } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";

function FlickingDemo({ label, useCSSOrder }) {
  const ref = useRef(null);
  const [domOrder, setDomOrder] = useState("—");

  const updateDomOrder = () => {
    const camera = ref.current?.camera?.element;
    if (!camera) return;
    const ids = [...camera.children].map(el => el.dataset.id).join(" → ");
    setDomOrder(ids);
  };

  return (
    <div className="demo-container">
      <div className="demo-label">{label}</div>
      <Flicking
        ref={ref}
        circular={true}
        useCSSOrder={useCSSOrder}
        align="center"
        onMoveEnd={updateDomOrder}
        onReady={updateDomOrder}
      >
        <div className="flicking-panel panel-1" data-id="1">
          Panel 1
        </div>
        <div className="flicking-panel panel-2" data-id="2">
          Panel 2
        </div>
        <div className="flicking-panel panel-3" data-id="3">
          Panel 3
        </div>
        <div className="flicking-panel panel-4" data-id="4">
          Panel 4
        </div>
        <div className="flicking-panel panel-5" data-id="5">
          Panel 5
        </div>
      </Flicking>
      <div className="controls">
        <button onClick={() => ref.current?.prev().catch(() => {})}>Prev</button>
        <button onClick={() => ref.current?.next().catch(() => {})}>Next</button>
      </div>
      <div className="dom-order-display">DOM order: {domOrder}</div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <FlickingDemo
        label="useCSSOrder: false (default) — DOM node order changes in circular mode"
        useCSSOrder={false}
      />
      <FlickingDemo
        label="useCSSOrder: true — preserves DOM order, uses CSS order property for visual ordering"
        useCSSOrder={true}
      />
    </div>
  );
}
