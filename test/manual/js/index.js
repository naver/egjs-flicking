const flicking = new Flicking("#flicking");

flicking.on(Flicking.EVENTS.CHANGED, e => {
  console.log(e);
});
