const flicking = new Flicking("#flicking", { moveType: "freeScroll" });

Object.values(Flicking.EVENTS).forEach(evt => {
  flicking.on(evt, console.log);
});

document.querySelector("#prev").addEventListener("click", () => flicking.prev().catch(() => void 0));
document.querySelector("#next").addEventListener("click", () => flicking.next().catch(() => void 0));

flicking.panels.forEach(panel => {
  panel.element.addEventListener("click", e => {
    alert("clicked");
  });
});
