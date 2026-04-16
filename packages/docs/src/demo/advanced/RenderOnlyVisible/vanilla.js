import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const TOTAL = 20;
const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

// Create panels
function createPanels(cameraSelector) {
  const camera = document.querySelector(cameraSelector);
  for (let i = 0; i < TOTAL; i++) {
    const panel = document.createElement("div");
    panel.className = "flicking-panel";
    panel.style.background = COLORS[i % COLORS.length];
    panel.textContent = `Panel ${i + 1}`;
    camera.appendChild(panel);
  }
}

createPanels("#flick-visible .flicking-camera");
createPanels("#flick-normal .flicking-camera");

const visibleCountEl = document.getElementById("visible-count");
const normalCountEl = document.getElementById("normal-count");

function updateCounts() {
  visibleCountEl.textContent = document.querySelectorAll("#flick-visible .flicking-camera > .flicking-panel").length;
  normalCountEl.textContent = document.querySelectorAll("#flick-normal .flicking-camera > .flicking-panel").length;
}

// renderOnlyVisible: true
const visibleFlicking = new Flicking("#flick-visible", {
  align: "prev",
  renderOnlyVisible: true
});

visibleFlicking.on("ready", updateCounts);
visibleFlicking.on("visibleChange", updateCounts);

// renderOnlyVisible: false (default)
const normalFlicking = new Flicking("#flick-normal", {
  align: "prev"
});

normalFlicking.on("ready", updateCounts);
