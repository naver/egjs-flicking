import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#3e8ed0", "#00d1b2", "#f14668", "#ffe08a", "#48c78e", "#9c27b0", "#ff5722"];
let nextId = 5;

const flicking = new Flicking("#flick", {
  align: "prev",
  needPanelThreshold: 100
});

function addLog(message) {
  const logEl = document.getElementById("event-log");
  const div = document.createElement("div");
  div.textContent = message;
  logEl.appendChild(div);
  // Keep only last 5 entries
  while (logEl.children.length > 5) {
    logEl.removeChild(logEl.firstChild);
  }
}

function updateCounter() {
  const count = flicking.panelCount;
  document.getElementById("panel-count").textContent = count;
}

flicking.on("needPanel", e => {
  addLog(`needPanel: direction=${e.direction}`);

  if (e.direction === "NEXT") {
    // NEXT: append panels
    const newPanels = [];
    for (let i = 0; i < 3; i++) {
      const panel = document.createElement("div");
      panel.className = "flicking-panel";
      panel.style.background = COLORS[nextId % COLORS.length];
      panel.textContent = `Panel ${nextId + 1}`;
      newPanels.push(panel);
      nextId++;
    }
    flicking.append(newPanels);
    addLog(`Added: Panel ${nextId - 3}, ${nextId - 2}, ${nextId - 1}`);
    updateCounter();
  }
});

flicking.on("ready", updateCounter);
