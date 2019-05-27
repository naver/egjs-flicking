setTimeout(function() {
    document.body.style.display = "";

    // Resizing
    f1 = createFlicking("#flick1", {
        circular: true,
        gap: 50,
        autoResize: true
    }).on("moveEnd", e => e.panel.update(el => {
        el.className = "column is-half eg-flick-panel has-background-" + PANEL_COLORS[e.panel.getIndex()];
        el.innerHTML = "<p>RESIZED</p>";
    }));

    f2 = createFlicking("#flick2", {
        circular: true,
        gap: 50,
        autoResize: true
    });
}, 500);
