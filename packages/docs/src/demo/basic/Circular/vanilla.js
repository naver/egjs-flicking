import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// circular: false (default)
new Flicking("#flick-normal", {
  circular: false,
  align: "center"
});

// circular: true (infinite loop)
new Flicking("#flick-circular", {
  circular: true,
  align: "center"
});
