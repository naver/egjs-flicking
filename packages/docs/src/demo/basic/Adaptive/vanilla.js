import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// adaptive: false (default)
new Flicking("#flick-fixed", {
  adaptive: false,
  align: "center"
});

// adaptive: true
new Flicking("#flick-adaptive", {
  adaptive: true,
  align: "center"
});
