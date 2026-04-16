import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

function formatTime() {
  return new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
  });
}

// debounce: 0 (default)
const flickA = new Flicking("#flick-a", {
  resizeDebounce: 0,
  maxResizeDebounce: 100
});

// debounce: 300ms / maxDebounce: 800ms
const flickB = new Flicking("#flick-b", {
  resizeDebounce: 300,
  maxResizeDebounce: 800
});

const logElA = document.getElementById("log-a");
const logElB = document.getElementById("log-b");
const countElA = document.getElementById("count-a");
const countElB = document.getElementById("count-b");
const logsA = [];
const logsB = [];

function addLog(logs, logEl, countEl) {
  logs.unshift(`[${formatTime()}] resize()`);
  if (logs.length > 30) logs.pop();
  logEl.innerHTML = logs.map(l => `<div>${l}</div>`).join("");
  countEl.textContent = `${logs.length}x`;
}

flickA.on("afterResize", () => addLog(logsA, logElA, countElA));
flickB.on("afterResize", () => addLog(logsB, logElB, countElB));

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
