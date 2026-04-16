import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// duration: 100 (fast)
new Flicking("#flick-fast", {
  duration: 100,
  align: "center"
});

// duration: 500 (default)
new Flicking("#flick-default", {
  duration: 500,
  align: "center"
});

// duration: 1500 (slow)
new Flicking("#flick-slow", {
  duration: 1500,
  align: "center"
});
