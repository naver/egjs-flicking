import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick", {
  moveType: "freeScroll"
});
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

reactiveAPI.subscribe("progress", value => {
  progressBar.style.width = `${value}%`;
  progressText.textContent = `Progress: ${value.toFixed(1)}%`;
});
