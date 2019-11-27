setTimeout(function() {
  document.body.style.display = "";

  // Resizing
  f1 = createFlicking("#flick1", {
    // bounce: 0,
    bound: true,
    // circular: true,
    duration: 1000,
    defaultIndex: 2,
    moveType: "freeScroll"
  }).on("change", e => {
    console.log(e);
  }).on("restore", e => {
    console.log(e);
  }).on("moveEnd", e => {
    console.log(e);
  });

  f2 = createFlicking("#flick2", {
    bound: true,
  });

  f3 = createFlicking("#flick3", {
    bound: true,
    anchor: "0%",
    hanger: "100%"
  })
}, 500);
