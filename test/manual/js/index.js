const flicking = new Flicking("#flicking", {
  moveType: "freeScroll"
});

flicking.on("willChange", evt => {
  evt.stop();
});
