

window.flicking = new Flicking("#flick", {
  // inputType: ["pointer"],
  moveType: "strict",
  bounce: 0,
  // iOSEdgeSwipeThreshold: 30,
});

// flicking.on("willChange", e => {
//     console.log("STOP", flicking.currentPanel.index);
//   e.stop();
//   console.log("WILL CHANGE", e);
  
 
//   flicking.stopAnimation(); flicking.moveTo(flicking.currentPanel.index, 1000);

// })