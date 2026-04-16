import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

// preventClickOnDrag: true (default)
const _flick1 = new Flicking("#flick-prevent", {
  align: "center",
  preventClickOnDrag: true
});

let count1 = 0;
document.querySelectorAll("#flick-prevent .flicking-panel").forEach(el => {
  el.addEventListener("click", () => {
    count1++;
    document.getElementById("count1").textContent = `Click count: ${count1}`;
  });
});

// preventClickOnDrag: false
const _flick2 = new Flicking("#flick-no-prevent", {
  align: "center",
  preventClickOnDrag: false
});

let count2 = 0;
document.querySelectorAll("#flick-no-prevent .flicking-panel").forEach(el => {
  el.addEventListener("click", () => {
    count2++;
    document.getElementById("count2").textContent = `Click count: ${count2}`;
  });
});
