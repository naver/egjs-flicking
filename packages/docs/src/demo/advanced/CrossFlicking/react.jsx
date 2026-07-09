import { CrossFlicking } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";
import { useEffect, useRef } from "react";

// The panel structure is declared in JSX; the core CrossFlicking class is attached to it on mount.
// react-flicking's CrossFlicking/CrossGroup components are avoided for now because they break
// under React StrictMode (destroyed before their async init completes).
const CATEGORIES = [
  {
    name: "Nature",
    items: [
      { title: "Forest", gradient: "linear-gradient(135deg, #0f9b70, #1e5631)" },
      { title: "Meadow", gradient: "linear-gradient(135deg, #56ab2f, #a8e063)" },
      { title: "Canyon", gradient: "linear-gradient(135deg, #3ca55c, #b5ac49)" }
    ]
  },
  {
    name: "Ocean",
    items: [
      { title: "Reef", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)" },
      { title: "Wave", gradient: "linear-gradient(135deg, #1a2980, #26d0ce)" },
      { title: "Deep", gradient: "linear-gradient(135deg, #000046, #1cb5e0)" }
    ]
  },
  {
    name: "Sunset",
    items: [
      { title: "Dawn", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)" },
      { title: "Dusk", gradient: "linear-gradient(135deg, #f7971e, #ffd200)" },
      { title: "Ember", gradient: "linear-gradient(135deg, #cb2d3e, #ef473a)" }
    ]
  },
  {
    name: "Space",
    items: [
      { title: "Nebula", gradient: "linear-gradient(135deg, #654ea3, #eaafc8)" },
      { title: "Aurora", gradient: "linear-gradient(135deg, #4776e6, #8e54e9)" },
      { title: "Cosmos", gradient: "linear-gradient(135deg, #200122, #6f0000)" }
    ]
  }
];

export default function App() {
  const viewportRef = useRef(null);
  const flickingRef = useRef(null);

  useEffect(() => {
    // The ref keeps a single instance across StrictMode's double-invoke.
    if (flickingRef.current) return;
    flickingRef.current = new CrossFlicking(viewportRef.current, {
      align: "prev",
      moveType: "strict",
      bound: true,
      sideOptions: { moveType: "strict", bound: true }
    });
  }, []);

  return (
    <div ref={viewportRef} className="cross-viewport flicking-viewport">
      <div className="flicking-camera">
        {CATEGORIES.map((category, ci) => (
          <div className="cross-group" key={ci}>
            {category.items.map((it, ii) => (
              <div className="cross-panel" key={ii} style={{ background: it.gradient }}>
                <span className="panel-category">{category.name}</span>
                <span className="panel-title">{it.title}</span>
                <span className="panel-hint">↕ browse items · ↔ switch category</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
