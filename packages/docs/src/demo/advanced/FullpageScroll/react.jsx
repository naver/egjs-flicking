import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useState } from "react";

const PAGES = [
  { title: "Page 1", subtitle: "Welcome", color: "#e74c3c" },
  { title: "Page 2", subtitle: "Features", color: "#3498db" },
  { title: "Page 3", subtitle: "Pricing", color: "#2ecc71" },
  { title: "Page 4", subtitle: "Contact", color: "#f39c12" },
  { title: "Page 5", subtitle: "About", color: "#9b59b6" }
];

export default function App() {
  const [isVertical, setIsVertical] = useState(true);

  return (
    <div>
      <div className="controls">
        <button className={`button ${isVertical ? "active" : ""}`} onClick={() => setIsVertical(true)}>
          Vertical (Fullpage)
        </button>
        <button className={`button ${!isVertical ? "active" : ""}`} onClick={() => setIsVertical(false)}>
          Horizontal (Slider)
        </button>
      </div>
      <Flicking key={isVertical ? "v" : "h"} horizontal={!isVertical} moveType="strict" bound={true} align="prev">
        {PAGES.map((page, i) => (
          <div className="page-panel" key={i} style={{ background: page.color }}>
            <span>{page.title}</span>
            <span className="page-subtitle">{page.subtitle}</span>
          </div>
        ))}
      </Flicking>
    </div>
  );
}
