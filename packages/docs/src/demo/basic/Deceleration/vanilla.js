import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// deceleration: 0.001 (long inertia)
new Flicking("#flick-low", {
  deceleration: 0.001,
  align: "center"
});

// deceleration: 0.0075 (default)
new Flicking("#flick-default", {
  deceleration: 0.0075,
  align: "center"
});

// deceleration: 0.05 (short inertia)
new Flicking("#flick-high", {
  deceleration: 0.05,
  align: "center"
});
