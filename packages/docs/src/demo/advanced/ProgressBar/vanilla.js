import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

const camera = document.querySelector(".flicking-camera");
COLORS.forEach((color, i) => {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = color;
  panel.textContent = i + 1;
  camera.appendChild(panel);
});

const flicking = new Flicking("#flick", {
  moveType: "freeScroll",
  bound: true
});

const reactive = connectFlickingReactiveAPI(flicking);
const barEl = document.querySelector(".progress-bar");
const textEl = document.querySelector(".progress-text");

const update = () => {
  const p = reactive.progress;
  barEl.style.width = `${p}%`;
  textEl.textContent = `${p.toFixed(1)}%`;
};

reactive.subscribe("progress", update);
flicking.on("ready", update);
