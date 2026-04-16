import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const OFFSETS = [180, 160, 140, 120, 100];

const flicking = new Flicking("#flick");
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const panels = document.querySelectorAll(".skeleton-panel");

const update = value => {
  panels.forEach((panel, index) => {
    const childProgress = index - value;
    const opacity = Math.min(Math.max(1 - Math.abs(childProgress), 0), 1);

    const bars = panel.querySelectorAll(".skeleton-bar");
    bars.forEach((bar, i) => {
      bar.style.transform = `translateX(${childProgress * OFFSETS[i]}px)`;
      bar.style.opacity = opacity;
    });
  });
};

// Apply initial state and subscribe to changes
update(reactiveAPI.indexProgress);
reactiveAPI.subscribe("indexProgress", update);
