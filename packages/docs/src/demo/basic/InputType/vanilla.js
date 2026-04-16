import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// inputType: ["touch", "mouse"] (default)
new Flicking("#flick-both", {
  inputType: ["touch", "mouse"],
  align: "center"
});

// inputType: ["touch"]
new Flicking("#flick-touch", {
  inputType: ["touch"],
  align: "center"
});

// inputType: ["mouse"]
new Flicking("#flick-mouse", {
  inputType: ["mouse"],
  align: "center"
});
