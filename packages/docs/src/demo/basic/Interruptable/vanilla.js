import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// interruptable: true (default)
const flick1 = new Flicking("#flick-interruptable", {
  duration: 2000,
  align: "center",
  interruptable: true
});

document.getElementById("btn1").addEventListener("click", () => {
  flick1.next().catch(() => {});
});

// interruptable: false
const flick2 = new Flicking("#flick-not-interruptable", {
  duration: 2000,
  align: "center",
  interruptable: false
});

document.getElementById("btn2").addEventListener("click", () => {
  flick2.next().catch(() => {});
});
