import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// observePanelResize: false (default)
const _flick1 = new Flicking("#flick-default", {
  align: "center",
  observePanelResize: false
});

// observePanelResize: true
const _flick2 = new Flicking("#flick-observe", {
  align: "center",
  observePanelResize: true
});

// Toggle panel width on button click
document.querySelectorAll(".expand-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const panel = btn.closest(".flicking-panel");
    const isWide = panel.style.width === "70%";
    panel.style.width = isWide ? "40%" : "70%";
    btn.textContent = isWide ? "Expand" : "Shrink";
  });
});
