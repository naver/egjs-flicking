import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// autoInit: true (default)
new Flicking("#flick-auto", {
  autoInit: true,
  align: "center"
});

// autoInit: false (manual init)
const flickingManual = new Flicking("#flick-manual", {
  autoInit: false,
  align: "center"
});

let isInitialized = false;
const button = document.getElementById("init-btn");
const status = document.getElementById("init-status");

button.addEventListener("click", () => {
  if (!isInitialized) {
    flickingManual.init();
    isInitialized = true;
    button.textContent = "Initialized";
    button.disabled = true;
    status.textContent = "Status: initialized - drag enabled";
  }
});
