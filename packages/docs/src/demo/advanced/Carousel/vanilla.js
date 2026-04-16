import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];

function createPanels(containerId) {
  const camera = document.querySelector(`#${containerId} .flicking-camera`);
  COLORS.forEach((color, i) => {
    const panel = document.createElement("div");
    panel.className = "flicking-panel";
    panel.style.background = color;
    panel.textContent = i + 1;
    camera.appendChild(panel);
  });
}

createPanels("flick1");
createPanels("flick2");
createPanels("flick3");

new Flicking("#flick1", {
  circular: true,
  panelsPerView: 3,
  align: "prev"
});

new Flicking("#flick2", {
  circular: true,
  panelsPerView: 1,
  align: "center"
});

new Flicking("#flick3", {
  circular: false,
  panelsPerView: 3,
  align: "prev",
  bound: true
});
