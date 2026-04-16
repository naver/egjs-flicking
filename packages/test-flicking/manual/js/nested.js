const parentFlicking = new Flicking("#parent", {
  moveType: "freeScroll"
});
const childFlicking = new Flicking("#child", {
  moveType: "freeScroll",
  bounce: 0,
  bound: true,
  nested: true
});

parentFlicking.on("willChange", evt => {
  evt.stop();
});
