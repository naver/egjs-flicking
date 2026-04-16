import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const PANEL_COUNT = 200;
const HEIGHTS = ["panel-h120", "panel-h130", "panel-h140", "panel-h150", "panel-h160"];
const HEIGHT_LABELS = [120, 130, 140, 150, 160];

function createPanels(cameraEl) {
  for (let i = 0; i < PANEL_COUNT; i++) {
    const panel = document.createElement("div");
    panel.className = `flicking-panel ${HEIGHTS[i % 5]}`;
    panel.textContent = `Panel ${i + 1} (${HEIGHT_LABELS[i % 5]}px)`;
    cameraEl.appendChild(panel);
  }
}

createPanels(document.querySelector("#flick-off .flicking-camera"));
createPanels(document.querySelector("#flick-on .flicking-camera"));

new Flicking("#flick-off", {
  renderOnlyVisible: true,
  autoResize: true,
  optimizeSizeUpdate: false
});

new Flicking("#flick-on", {
  renderOnlyVisible: true,
  autoResize: true,
  optimizeSizeUpdate: true
});
