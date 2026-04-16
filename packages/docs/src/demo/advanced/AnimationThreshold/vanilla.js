import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// animationThreshold: 0.5 (default)
const flick1 = new Flicking("#flick-default", {
  duration: 1000,
  animationThreshold: 0.5,
  align: "center"
});

flick1.on("willChange", () => {
  document.getElementById("log1").textContent = "▶ Animation started";
});
flick1.on("moveEnd", () => {
  document.getElementById("log1").textContent = "✓ Move complete";
});

document.getElementById("prev1").addEventListener("click", () => flick1.prev().catch(() => {}));
document.getElementById("next1").addEventListener("click", () => flick1.next().catch(() => {}));

// animationThreshold: 300
const flick2 = new Flicking("#flick-threshold", {
  duration: 1000,
  animationThreshold: 300,
  align: "center"
});

flick2.on("willChange", () => {
  document.getElementById("log2").textContent = "▶ Animation started";
});
flick2.on("moveEnd", () => {
  document.getElementById("log2").textContent = "✓ Move complete";
});

document.getElementById("prev2").addEventListener("click", () => flick2.prev().catch(() => {}));
document.getElementById("next2").addEventListener("click", () => flick2.next().catch(() => {}));
