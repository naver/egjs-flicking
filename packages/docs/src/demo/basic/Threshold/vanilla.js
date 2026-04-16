import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// threshold: 10 (sensitive)
new Flicking("#flick-low", {
  threshold: 10,
  align: "center"
});

// threshold: 40 (default)
new Flicking("#flick-default", {
  threshold: 40,
  align: "center"
});

// threshold: 100 (insensitive)
new Flicking("#flick-high", {
  threshold: 100,
  align: "center"
});
