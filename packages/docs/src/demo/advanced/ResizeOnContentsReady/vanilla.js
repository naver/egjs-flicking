import Flicking from "@egjs/flicking";
import "@egjs/flicking/dist/flicking.css";
import "./styles.css";

const t = Date.now();
const HEIGHTS_WIDTHS = [
  [300, 150],
  [200, 150],
  [400, 150],
  [250, 150]
];

// Set image src before Flicking init, so resizeOnContentsReady can detect them
document.querySelectorAll("#flick-auto .flicking-panel img").forEach((img, i) => {
  img.src = `https://picsum.photos/${HEIGHTS_WIDTHS[i][0]}/${HEIGHTS_WIDTHS[i][1]}?t=${t}&r=${i + 1}`;
});
document.querySelectorAll("#flick-manual .flicking-panel img").forEach((img, i) => {
  img.src = `https://picsum.photos/${HEIGHTS_WIDTHS[i][0]}/${HEIGHTS_WIDTHS[i][1]}?t=${t}&r=${i + 5}`;
});

const autoFlicking = new Flicking("#flick-auto", {
  align: "prev",
  resizeOnContentsReady: true,
  preventDefaultOnDrag: true,
  bound: true
});

const manualFlicking = new Flicking("#flick-manual", {
  align: "prev",
  resizeOnContentsReady: false,
  preventDefaultOnDrag: true,
  bound: true
});

function updateSizes() {
  setTimeout(() => {
    try {
      document.getElementById("auto-sizes").textContent = autoFlicking.panels.map(p => Math.round(p.size)).join(", ");
      document.getElementById("manual-sizes").textContent = manualFlicking.panels
        .map(p => Math.round(p.size))
        .join(", ");
    } catch (_e) {
      /* ignore */
    }
  }, 500);
}

autoFlicking.on("ready", updateSizes);
manualFlicking.on("ready", updateSizes);

document.querySelectorAll("#flick-auto img").forEach(img => {
  img.addEventListener("load", updateSizes);
});
document.querySelectorAll("#flick-manual img").forEach(img => {
  img.addEventListener("load", updateSizes);
});

document.querySelectorAll(".move-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const idx = parseInt(btn.dataset.index, 10);
    autoFlicking.moveTo(idx, 500).catch(() => {});
    manualFlicking.moveTo(idx, 500).catch(() => {});
  });
});
