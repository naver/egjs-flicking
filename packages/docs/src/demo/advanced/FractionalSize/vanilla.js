import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

new Flicking("#flick-false", {
  defaultIndex: 2,
  useFractionalSize: false
});

new Flicking("#flick-true", {
  defaultIndex: 2,
  useFractionalSize: true
});
