import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick");
const reactiveAPI = connectFlickingReactiveAPI(flicking);

// Create pagination buttons
const pagination = document.querySelector(".pagination");
const buttons = [];

for (let i = 0; i < reactiveAPI.totalPanelCount; i++) {
  const btn = document.createElement("button");
  btn.className = `pagination-btn${i === 0 ? " active" : ""}`;
  btn.textContent = i + 1;
  btn.addEventListener("click", () => reactiveAPI.moveTo(i));
  buttons.push(btn);
  pagination.appendChild(btn);
}

// Update active button on index change
reactiveAPI.subscribe("currentPanelIndex", index => {
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
});
