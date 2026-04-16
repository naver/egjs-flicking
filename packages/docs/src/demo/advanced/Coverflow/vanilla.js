import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#2980b9"];
const LENGTH = COLORS.length;

const camera = document.querySelector(".flicking-camera");
const panels = COLORS.map((color, i) => {
  const panel = document.createElement("div");
  panel.className = "flicking-panel";
  panel.style.background = color;
  panel.textContent = i + 1;
  camera.appendChild(panel);
  return panel;
});

const flicking = new Flicking("#flick", {
  circular: true,
  align: "center"
});

const reactive = connectFlickingReactiveAPI(flicking);

const update = () => {
  const ip = reactive.indexProgress;
  panels.forEach((panel, i) => {
    const childProgress = ((i - ip + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
    const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);
    const rotateY = -childProgress * 50;
    const opacity = Math.max(0, 1 - Math.abs(childProgress) * 0.3);
    panel.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
    panel.style.opacity = opacity;
  });
};

reactive.subscribe("indexProgress", update);
flicking.on("ready", update);
