const flicking = new Flicking("#flicking", {
  moveType: "strict",
  renderOnlyVisible: true
});

new Array(6).fill(0).map((_, idx) => {
  document.querySelector(`#btn-${idx}`).addEventListener("click", () => {
    flicking.moveTo(idx);
  });
});
