import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// panelsPerView: -1 (default)
new Flicking("#flick-manual", {
  panelsPerView: -1,
  align: "prev"
});

// panelsPerView: 3
new Flicking("#flick-three", {
  panelsPerView: 3,
  align: "prev"
});

// panelsPerView: 1
new Flicking("#flick-one", {
  panelsPerView: 1,
  align: "center"
});
