const flicking = new Flicking("#flicking", {
  circular: true,
  moveType: "strict",
  align: "prev"
}).on("afterResize", () => {
  console.log("resized");
}).on("ready", () => {
  console.log("ready");
});

// Object.values(Flicking.EVENTS).forEach(evt => {
//   flicking.on(evt, console.log);
// });

// document.querySelector("#prev").addEventListener("click", () => flicking.prev().catch(() => void 0));
// document.querySelector("#next").addEventListener("click", () => flicking.next().catch(() => void 0));
document.querySelector("#resize").addEventListener("click", () => flicking.viewport.setSize({ width: 100, height: 100 }));

// flicking.panels.forEach(panel => {
//   panel.element.addEventListener("click", e => {
//     console.error("clicked");
//   });
// });
