import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// horizontal: true (default)
new Flicking("#flick-horizontal", {
  horizontal: true,
  align: "prev",
  bound: true
});

// horizontal: false (vertical)
// In vanilla JS, you must add the "vertical" class
// to the flicking-viewport element manually.
// React and Vue wrappers add it automatically.
new Flicking("#flick-vertical", {
  horizontal: false,
  align: "prev",
  bound: true
});
