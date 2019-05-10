setTimeout(function() {
    document.body.style.display = "";

    // Event Stopping
    s1 = createFlicking("#stop-holdStart", {
        circular: true,
        autoResize: true
    }).on({
        holdStart: function(e) {
            e.stop();
            console.log(e);
        }
    });
    s2 = createFlicking("#stop-moveStart", {
        circular: true,
        autoResize: true
    }).on({
        moveStart: function(e) {
            e.stop();
            console.log(e);
        }
    });
    s3 = createFlicking("#stop-move", {
        circular: true,
        autoResize: true
    }).on({
        move: function(e) {
            e.stop();
            console.log(e);
        }
    });
    s4 = createFlicking("#stop-change", {
        circular: true,
        autoResize: true
    }).on({
        change: function(e) {
            e.stop();
            console.log(e);
        },
        restore: function(e) {
            console.log(e);
        }
    });
    s5 = createFlicking("#stop-restore", {
        circular: true,
        threshold: 500,
        autoResize: true
    }).on({
        restore: function(e) {
            e.stop();
            console.log(e);
        },
        change: function(e) {
            console.log(e);
        }
    });
}, 500);
