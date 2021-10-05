const flicking = new Flicking("#flicking", {
  panelsPerView: 5,
  virtual: {
    renderPanel: panel => `Panel ${panel.index}`,
    initialPanelCount: 100
  }
});

// Object.values(Flicking.EVENTS).forEach(evt => {
//   flicking.on(evt, console.log);
// });

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
