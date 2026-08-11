import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// autoResize is disabled to simulate the moment before resize() is applied
const flickingPx = new Flicking("#flick-px", {
  usePercentagePos: false,
  autoResize: false,
  defaultIndex: 2
});

const flickingPercent = new Flicking("#flick-percent", {
  usePercentagePos: true,
  autoResize: false,
  defaultIndex: 2
});

const transformElPx = document.getElementById("transform-px");
const transformElPercent = document.getElementById("transform-percent");

function updateTransform(flicking, el) {
  el.textContent = flicking.camera.element.style.transform;
}

flickingPx.on("move", () => updateTransform(flickingPx, transformElPx));
flickingPx.on("afterResize", () => updateTransform(flickingPx, transformElPx));
flickingPercent.on("move", () => updateTransform(flickingPercent, transformElPercent));
flickingPercent.on("afterResize", () => updateTransform(flickingPercent, transformElPercent));

updateTransform(flickingPx, transformElPx);
updateTransform(flickingPercent, transformElPercent);

// Toggle the container width (100% ↔ 60%)
const wraps = [document.getElementById("wrap-px"), document.getElementById("wrap-percent")];
const widthLabel = document.getElementById("width-value");
let narrow = false;

document.getElementById("toggle-width").addEventListener("click", () => {
  narrow = !narrow;
  const width = narrow ? "60%" : "100%";
  wraps.forEach(wrap => {
    wrap.style.width = width;
  });
  widthLabel.textContent = width;
});

// Recalculate the internal sizes manually
document.getElementById("call-resize").addEventListener("click", () => {
  flickingPx.resize();
  flickingPercent.resize();
});
