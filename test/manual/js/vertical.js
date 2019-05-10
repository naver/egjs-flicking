 setTimeout(function() {
    document.body.style.display = "";

    // Vertical
    f3 = createFlicking("#flick3", {
        horizontal: false,
        autoResize: true
    });
    f3a = createFlicking("#flick3-1", {
        horizontal: false,
        bound: true,
        autoResize: true,
        anchor: "100%",
        hanger: "100%"
    });
    f3b = createFlicking("#flick3-2", {
        horizontal: false,
        circular: true,
        autoResize: true
    });
}, 500);
