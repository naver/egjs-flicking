import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// disableOnInit: false (default)
new Flicking("#flick-enabled", {
  disableOnInit: false,
  align: "center"
});

// disableOnInit: true
new Flicking("#flick-disabled", {
  disableOnInit: true,
  align: "center"
});

// dynamic toggle
const flickingToggle = new Flicking("#flick-toggle", {
  align: "center"
});

let isDisabled = false;
const button = document.getElementById("toggle-btn");
const label = document.getElementById("toggle-label");

button.addEventListener("click", () => {
  if (isDisabled) {
    flickingToggle.enableInput();
    button.textContent = "Disable input";
    label.textContent = "Dynamic toggle: enabled";
  } else {
    flickingToggle.disableInput();
    button.textContent = "Enable input";
    label.textContent = "Dynamic toggle: disabled";
  }
  isDisabled = !isDisabled;
});
