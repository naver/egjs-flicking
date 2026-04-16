import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// defaultIndex: 0 (default)
new Flicking("#flick-first", {
  defaultIndex: 0,
  align: "center"
});

// defaultIndex: 2
new Flicking("#flick-middle", {
  defaultIndex: 2,
  align: "center"
});

// defaultIndex: 4 (last)
new Flicking("#flick-last", {
  defaultIndex: 4,
  align: "center"
});
