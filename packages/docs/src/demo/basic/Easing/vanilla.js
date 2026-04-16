import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// Easing functions
const linear = x => x;
const easeOutCubic = x => 1 - (1 - x) ** 3;
const easeInOutQuad = x => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

// linear
new Flicking("#flick-linear", {
  easing: linear,
  duration: 800,
  align: "center"
});

// easeOutCubic (default)
new Flicking("#flick-ease-out", {
  easing: easeOutCubic,
  duration: 800,
  align: "center"
});

// easeInOutQuad
new Flicking("#flick-ease-in-out", {
  easing: easeInOutQuad,
  duration: 800,
  align: "center"
});
