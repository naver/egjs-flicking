setTimeout(function() {
    document.body.style.display = "";

    // Snap & Free Scroll
    f4 = createFlicking("#flick4", {
        moveType: {type: "snap", count: 2},
        duration: 3000,
        bounce: 100,
        autoResize: true
    });
    f4a = createFlicking("#flick4-1", {
        moveType: {type: "snap", count: 2},
        circular: true,
        duration: 1000,
        autoResize: true
    });
    f4b = createFlicking("#flick4-2", {
        moveType: "freeScroll",
        duration: 500,
        bounce: 100,
        autoResize: true
    });
    f4c = createFlicking("#flick4-3", {
        moveType: "freeScroll",
        circular: true,
        duration: 500,
        autoResize: true
    });
}, 500);
