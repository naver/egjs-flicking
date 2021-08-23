const flicking = new Flicking("#flicking", {
});

// Object.values(Flicking.EVENTS).forEach(evt => {
//   flicking.on(evt, console.log);
// });

flicking.on(Flicking.EVENTS.NEED_PANEL, e => {
  if (e.direction === "PREV") return;

  flicking.append(`<div class="flicking-panel has-text-white has-background-primary">${flicking.panelCount + 1}</div>`);
});

document.querySelector("#prev").addEventListener("click", () => flicking.prev().catch(() => void 0));
document.querySelector("#next").addEventListener("click", () => flicking.next().catch(() => void 0));

flicking.panels.forEach(panel => {
  panel.element.addEventListener("click", e => {
    console.error("clicked");
  });
});
