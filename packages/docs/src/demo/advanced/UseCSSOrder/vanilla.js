import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

function updateDomOrder(flicking, labelEl) {
  const camera = flicking.camera.element;
  const ids = [...camera.children].map(el => el.dataset.id).join(" → ");
  labelEl.textContent = `DOM order: ${ids}`;
}

// useCSSOrder: false (default)
const flick1 = new Flicking("#flick-default", {
  circular: true,
  useCSSOrder: false,
  align: "center"
});

const log1 = document.getElementById("log1");
const update1 = () => updateDomOrder(flick1, log1);
flick1.on("ready", update1);
flick1.on("moveEnd", update1);

document.getElementById("prev1").addEventListener("click", () => flick1.prev().catch(() => {}));
document.getElementById("next1").addEventListener("click", () => flick1.next().catch(() => {}));

// useCSSOrder: true
const flick2 = new Flicking("#flick-cssorder", {
  circular: true,
  useCSSOrder: true,
  align: "center"
});

const log2 = document.getElementById("log2");
const update2 = () => updateDomOrder(flick2, log2);
flick2.on("ready", update2);
flick2.on("moveEnd", update2);

document.getElementById("prev2").addEventListener("click", () => flick2.prev().catch(() => {}));
document.getElementById("next2").addEventListener("click", () => flick2.next().catch(() => {}));
