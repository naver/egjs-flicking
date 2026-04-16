import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const TOTAL_PANELS = 1000;
const _COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];

// Virtual mode: 1000 panels
const virtualFlicking = new Flicking("#flick-virtual", {
  align: "prev",
  panelsPerView: 3,
  virtual: {
    renderPanel: (panel, index) => `<div class="panel-inner color-${index % 7}">Panel ${index + 1}</div>`,
    initialPanelCount: TOTAL_PANELS,
    cache: true,
    panelClass: "flicking-panel"
  }
});

// Normal mode: 100 panels (for comparison)
// In normal mode, panels are created as HTML elements
const normalFlicking = new Flicking("#flick-normal", {
  align: "prev"
});

// Update DOM element count
function updateDomCounts() {
  const virtualCount = document.querySelectorAll("#flick-virtual .flicking-panel").length;
  const normalCount = document.querySelectorAll("#flick-normal .flicking-panel").length;

  document.getElementById("virtual-count").textContent = virtualCount;
  document.getElementById("normal-count").textContent = normalCount;
}

virtualFlicking.on("move", updateDomCounts);
virtualFlicking.on("ready", updateDomCounts);
normalFlicking.on("ready", updateDomCounts);

updateDomCounts();
