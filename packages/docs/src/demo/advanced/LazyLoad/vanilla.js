import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const TOTAL = 100;
const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];
const getImageUrl = i => `https://picsum.photos/seed/${i}/250/180`;

const camera = document.querySelector(".flicking-camera");
for (let i = 0; i < TOTAL; i++) {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = COLORS[i % COLORS.length];
  panel.innerHTML = `<div class="placeholder">Panel ${i}</div>`;
  camera.appendChild(panel);
}

const loadedSet = new Set();
const infoBar = document.querySelector(".info-bar");

const updateInfo = () => {
  infoBar.textContent = `Images loaded: ${loadedSet.size} / ${TOTAL} (only visible panels are loaded)`;
};

const loadImage = panel => {
  const idx = panel.index;
  if (loadedSet.has(idx)) return;
  loadedSet.add(idx);
  panel.element.innerHTML = `<img src="${getImageUrl(idx)}" alt="Panel ${idx}" />`;
  updateInfo();
};

const flicking = new Flicking("#flick", {
  renderOnlyVisible: true,
  align: "prev",
  bound: true,
  preventDefaultOnDrag: true
});

flicking.on("ready", e => {
  e.currentTarget.visiblePanels.forEach(loadImage);
});

flicking.on("visibleChange", e => {
  e.added.forEach(loadImage);
});
