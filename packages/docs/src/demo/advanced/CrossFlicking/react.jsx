import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "./styles.css";
import { useState } from "react";

const GROUPS = [
  { name: "Group A", colors: ["#e74c3c", "#c0392b", "#e67e22"] },
  { name: "Group B", colors: ["#3498db", "#2980b9", "#1abc9c"] },
  { name: "Group C", colors: ["#2ecc71", "#27ae60", "#16a085"] }
];

export default function App() {
  const [outerIndex, setOuterIndex] = useState(0);

  return (
    <div>
      <Flicking
        horizontal={false}
        moveType="strict"
        bound={true}
        align="prev"
        onChanged={e => setOuterIndex(e.index)}
        className="outer-viewport"
      >
        {GROUPS.map((group, gi) => (
          <div className="outer-panel" key={gi}>
            <div className="group-label">{group.name} (swipe vertically to switch groups)</div>
            <Flicking nested={true} moveType="strict" bound={true} align="prev">
              {group.colors.map((color, pi) => (
                <div className="inner-panel" key={pi} style={{ background: color }}>
                  <span>
                    {group.name}-{pi + 1}
                  </span>
                  <span className="panel-subtitle">swipe horizontally</span>
                </div>
              ))}
            </Flicking>
          </div>
        ))}
      </Flicking>
      <div className="info-bar">
        Current group: {GROUPS[outerIndex]?.name || "?"} (vertical: switch groups / horizontal: navigate within group)
      </div>
    </div>
  );
}
