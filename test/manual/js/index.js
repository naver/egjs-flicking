const flicking = new Flicking("#flicking", {
  panelsPerView: 3,
  circular: true,
  virtual: {
    renderPanel: panel => `Panel ${panel.index}`,
    initialPanelCount: 6
  }
});

// Object.values(Flicking.EVENTS).forEach(evt => {
//   flicking.on(evt, console.log);
// });

// document.querySelector("#prev").addEventListener("click", () => flicking.prev().catch(() => void 0));
// document.querySelector("#next").addEventListener("click", () => flicking.next().catch(() => void 0));
document.querySelector("#resize").addEventListener("click", () => flicking.viewport.setSize({ width: 100, height: 100 }));
document.querySelector("#prev").addEventListener("click", () => {
  flicking.virtual.prepend(5);
});
document.querySelector("#next").addEventListener("click", () => {
  flicking.virtual.append(5);
});

// flicking.panels.forEach(panel => {
//   panel.element.addEventListener("click", e => {
//     console.error("clicked");
//   });
// });
