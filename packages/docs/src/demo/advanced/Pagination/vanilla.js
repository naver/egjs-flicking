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

const flicking = new Flicking("#flick", { align: "center" });
const reactive = connectFlickingReactiveAPI(flicking);

const pagination = document.querySelector(".pagination");
const dots = COLORS.map((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.addEventListener("click", () => reactive.moveTo(i));
  pagination.appendChild(dot);
  return dot;
});

const update = () => {
  dots.forEach((dot, i) => {
    dot.className = i === reactive.currentPanelIndex ? "dot active" : "dot";
  });
};

reactive.subscribe("currentPanelIndex", update);
flicking.on("ready", update);
