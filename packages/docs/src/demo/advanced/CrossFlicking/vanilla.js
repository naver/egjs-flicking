import { CrossFlicking } from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// The panel structure lives in index.html; attaching CrossFlicking is all that's needed.
new CrossFlicking("#cross", {
  align: "prev",
  moveType: "strict",
  bound: true,
  sideOptions: { moveType: "strict", bound: true }
});
