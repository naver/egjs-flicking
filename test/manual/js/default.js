setTimeout(function() {
    document.body.style.display = "";

    // Horizontal, Non-circular
    f1 = createFlicking("#flick1", {
        autoResize: true
    });
    f1a = createFlicking("#flick1-1", {
        anchor: 0,
        hanger: 0,
        autoResize: true
    });
    f1b = createFlicking("#flick1-2", {
        hanger: "0%",
        anchor: "0%",
        autoResize: true
    });
    f1c = createFlicking("#flick1-3", {
        hanger: "100%",
        anchor: "100%",
        bound: true,
        autoResize: true
    });
    f1d = createFlicking("#flick1-4", {
        hanger: "100%",
        anchor: "100%",
        autoResize: true
    });
    f1e = createFlicking("#flick1-5", {
        adaptive: true,
        autoResize: true
    });
    f1f = createFlicking("#flick1-6", {
        gap: 100,
        autoResize: true
    });
}, 500);
