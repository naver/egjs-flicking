import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// moveType: "snap" (default)
new Flicking("#flick-snap", {
  moveType: "snap",
  align: "center"
});

// moveType: "freeScroll"
new Flicking("#flick-free", {
  moveType: "freeScroll",
  align: "center",
  bound: true
});

// moveType: "strict"
new Flicking("#flick-strict", {
  moveType: "strict",
  align: "center"
});
