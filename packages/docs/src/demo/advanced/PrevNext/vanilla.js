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

const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const infoEl = document.querySelector(".nav-info");

const update = () => {
  const idx = reactive.currentPanelIndex;
  const total = reactive.totalPanelCount;
  prevBtn.disabled = reactive.isReachStart;
  nextBtn.disabled = reactive.isReachEnd;
  infoEl.textContent = `${idx + 1} / ${total}`;
};

prevBtn.addEventListener("click", () => reactive.moveTo(reactive.currentPanelIndex - 1));
nextBtn.addEventListener("click", () => reactive.moveTo(reactive.currentPanelIndex + 1));

reactive.subscribe("currentPanelIndex", update);
flicking.on("ready", update);
