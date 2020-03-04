setTimeout(function() {
    document.body.style.display = "";

    // Circular
    f2 = createFlicking("#flick2", {
        circular: true,
        duration: 300,
        autoResize: true,
        renderOnlyVisible: true
    });

    f2a = createFlicking("#flick2-1", {
        circular: true,
        duration: 300,
        autoResize: true
    });

    f2b = createFlicking("#flick2-2", {
        circular: true,
        gap: 10,
        duration: 3000,
        autoResize: true
    }).on("select", e => e.panel.prev().prev().prev().focus(3000));

    f2c = createFlicking("#flick2-3", {
        circular: true,
        autoResize: true,
        renderOnlyVisible: true
    });

    f2d = createFlicking("#flick2-4", {
        circular: true,
        gap: 10,
        autoResize: true
    });
  }, 500);
