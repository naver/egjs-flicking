import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// bound: false (default)
new Flicking("#flick-unbound", {
  bound: false,
  align: "prev"
});

// bound: true
new Flicking("#flick-bound", {
  bound: true,
  align: "prev"
});

// bound: true + bounce: "50%"
new Flicking("#flick-bounce", {
  bound: true,
  bounce: "50%",
  align: "prev"
});
