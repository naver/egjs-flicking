const flicking = new Flicking("#flicking", {
  circular: true,
  resizeDebounce: 16,
  maxResizeDebounce: 100,
  moveType: "strict"
});

new Array(6).fill(0).map((_, idx) => {
  document.querySelector(`#btn-${idx}`).addEventListener("click", () => {
    flicking.moveTo(idx);
  });
});
