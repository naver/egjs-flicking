import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const flicking = new Flicking("#flick");
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

prevBtn.addEventListener("click", () => {
  if (!reactiveAPI.isReachStart) {
    reactiveAPI.moveTo(flicking.index - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (!reactiveAPI.isReachEnd) {
    reactiveAPI.moveTo(flicking.index + 1);
  }
});

// Update button state
reactiveAPI.subscribe("isReachStart", value => {
  prevBtn.disabled = value;
});

reactiveAPI.subscribe("isReachEnd", value => {
  nextBtn.disabled = value;
});
