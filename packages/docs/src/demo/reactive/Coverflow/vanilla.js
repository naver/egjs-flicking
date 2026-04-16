import Flicking, { connectFlickingReactiveAPI } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// Capture panel references BEFORE Flicking init (circular mode may modify DOM)
const panels = document.querySelectorAll(".flicking-panel");
const LENGTH = 5;

const flicking = new Flicking("#flick", {
  circular: true,
  align: "center"
});
const reactiveAPI = connectFlickingReactiveAPI(flicking);

const update = value => {
  panels.forEach((panel, index) => {
    const childProgress = ((index - value + LENGTH * 1.5) % LENGTH) - LENGTH * 0.5;
    const scale = Math.max(0, 0.9 - Math.abs(childProgress) * 0.2);

    panel.style.transformOrigin = `${50 - childProgress * 50}% 50%`;
    panel.style.transform = `rotateY(${-childProgress * 50}deg) scale(${scale})`;
  });
};

// Apply initial state and subscribe to changes
update(reactiveAPI.indexProgress);
reactiveAPI.subscribe("indexProgress", update);
