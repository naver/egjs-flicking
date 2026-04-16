import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// nested: false
new Flicking("#outer-false", { align: "center" });
document.querySelectorAll("#outer-false .inner-viewport").forEach(el => {
  new Flicking(el, { nested: false, align: "center", bound: true });
});

// nested: true
new Flicking("#outer-true", { align: "center" });
document.querySelectorAll("#outer-true .inner-viewport").forEach(el => {
  new Flicking(el, { nested: true, align: "center", bound: true });
});
