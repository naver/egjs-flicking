const flicking = new Flicking("#flicking", {
  moveType: "strict",
  circular: true,
  adaptive: true,
  changeOnHold: true,
  moveType: "strict"
});

flicking.on("willChange", evt => {
  console.log("willChange", evt.index);
});

flicking.on("willRestore", evt => {
  console.log("willRestore", evt.index);
});

flicking.on("changed", evt => {
  console.log("changed", evt.index);
});

flicking.on("restored", evt => {
  console.log("restored", evt.index);
});

// window.addEventListener("touchstart", () => {
//   window.addEventListener("touchmove", evt => {
//     console.log("touchmove", evt.cancelable);
//   });
// });
