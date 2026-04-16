import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
let counter = 5;

const camera = document.querySelector(".flicking-camera");
for (let i = 0; i < 5; i++) {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = COLORS[i % COLORS.length];
  panel.textContent = i;
  camera.appendChild(panel);
}

const flicking = new Flicking("#flick", {
  renderOnlyVisible: true,
  align: "prev",
  bound: true
});

const infoBar = document.querySelector(".info-bar");
const updateInfo = () => {
  infoBar.textContent = `Panel count: ${flicking.panelCount}`;
};

document.getElementById("btn-prepend").addEventListener("click", () => {
  flicking.prepend(
    `<div class="flicking-panel" style="background:${COLORS[counter % COLORS.length]}">${counter}</div>`
  );
  counter++;
  updateInfo();
});

document.getElementById("btn-append").addEventListener("click", () => {
  flicking.append(`<div class="flicking-panel" style="background:${COLORS[counter % COLORS.length]}">${counter}</div>`);
  counter++;
  updateInfo();
});

document.getElementById("btn-remove-first").addEventListener("click", () => {
  if (flicking.panelCount > 1) {
    flicking.remove(0);
    updateInfo();
  }
});

document.getElementById("btn-remove-last").addEventListener("click", () => {
  if (flicking.panelCount > 1) {
    flicking.remove(flicking.panelCount - 1);
    updateInfo();
  }
});
