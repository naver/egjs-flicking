const flicking = new Flicking("#flicking", {
  circular: true,
  moveType: "strict"
});

new Array(6).fill(0).map((_, idx) => {
  document.querySelector(`#btn-${idx}`).addEventListener("click", () => {
    flicking.moveTo(idx);
  });
});
