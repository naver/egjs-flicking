const flicking = new Flicking("#flicking", {
  circular: true,
  adaptive: true,
  moveType: "strict"
});

// window.addEventListener("touchstart", () => {
//   window.addEventListener("touchmove", evt => {
//     console.log("touchmove", evt.cancelable);
//   });
// });
