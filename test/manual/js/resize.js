setTimeout(function() {
    document.body.style.display = "";

    // Resizing
    f5 = createFlicking("#flick5", {
        circular: true,
        gap: 50,
        autoResize: true
    }).on("moveEnd", e => e.panel.update(el => {
        el.className = "column is-half eg-flick-panel has-background-" + PANEL_COLORS[e.panel.getIndex()];
        el.innerHTML = "<p>RESIZED</p>";
    }));
}, 500);
