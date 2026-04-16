import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// useResizeObserver: true (default)
const flickA = new Flicking("#flick-observer", {
  autoResize: true,
  useResizeObserver: true
});

// useResizeObserver: false
const flickB = new Flicking("#flick-window", {
  autoResize: true,
  useResizeObserver: false
});

let countA = 0;
let countB = 0;
const countElA = document.getElementById("count-a");
const countElB = document.getElementById("count-b");

flickA.on("afterResize", () => {
  countElA.textContent = ++countA;
});
flickB.on("afterResize", () => {
  countElB.textContent = ++countB;
});

// Change container width via slider
const slider = document.getElementById("width-slider");
const valueLabel = document.getElementById("width-value");
const wrapA = document.getElementById("wrap-a");
const wrapB = document.getElementById("wrap-b");

slider.addEventListener("input", () => {
  const w = `${slider.value}%`;
  wrapA.style.width = w;
  wrapB.style.width = w;
  valueLabel.textContent = `${slider.value}%`;
});

// Toggle autoResize
const toggleBtn = document.getElementById("btn-toggle");
let autoResizeOn = true;
toggleBtn.addEventListener("click", () => {
  autoResizeOn = !autoResizeOn;
  flickA.autoResize = autoResizeOn;
  flickB.autoResize = autoResizeOn;
  toggleBtn.textContent = `autoResize: ${autoResizeOn}`;
  toggleBtn.classList.toggle("active", autoResizeOn);

  document.getElementById("manual-btn").style.display = autoResizeOn ? "none" : "inline-block";
});

document.getElementById("manual-btn").addEventListener("click", () => {
  flickA.resize();
  flickB.resize();
});
