const flicking = new Flicking("#flicking", { moveType: "freeScroll" });

flicking.on(Flicking.EVENTS.WILL_RESTORE, e => {
  console.log(e);
});

flicking.on(Flicking.EVENTS.RESTORED, e => {
  console.log(e);
});

document.querySelector("#prev").addEventListener("click", () => flicking.prev().catch(() => void 0));
document.querySelector("#next").addEventListener("click", () => flicking.next().catch(() => void 0));

flicking.panels.forEach(panel => {
  panel.element.addEventListener("click", e => {
    alert("clicked");
  });
});
