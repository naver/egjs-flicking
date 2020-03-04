setTimeout(function() {
    document.body.style.display = "";

    // Non-successive indexes to test needPanel event
    n1 = createFlicking("#needPanel-addOnClick", {
        infinite: true,
        lastIndex: 5,
        autoResize: true
    }).on({
        needPanel: function(e) {
            console.log("NEED_PANEL", e)
        },
        select: function(e) {
            e.panel.insertAfter(createPanelElement(e.index + 1))
        }
    });
    n1.replace(0, createPanelElement(0));
    n1.replace(5, createPanelElement(5));

    n2 = createFlicking("#needPanel-insert1by1", {
        circular: true,
        infinite: true,
        // infiniteThreshold: 100,
        moveType: "freeScroll",
        lastIndex: 50,
        duration: 3000,
        autoResize: true,
        renderOnlyVisible: true
    }).on({
        needPanel: function(e) {
            console.log("NEED_PANEL", e);
            var newPanel = e.fill(createPanelElement(0))[0];
            newPanel.update(el => el.innerHTML = "<p>Layer " + newPanel.getIndex() + "</p>");
        }
    });
    n2.replace(50, createPanelElement(50));

    n3 = createFlicking("#needPanel-insert3", {
        infinite: true,
        autoResize: true,
        moveType: {
            type: "snap",
            count: 3
        }
    }).on({
        needPanel: function(e) {
            console.log("NEED_PANEL", e);
            e.direction === eg.Flicking.DIRECTION.NEXT
                ? e.panel.insertAfter([
                    createPanelElement(e.index + 1),
                    createPanelElement(e.index + 2),
                    createPanelElement(e.index + 3)
                ])
                : e.panel.insertBefore([
                    createPanelElement(e.index - 3),
                    createPanelElement(e.index - 2),
                    createPanelElement(e.index - 1)
                ]);
        }
    });
    n3.replace(10, createPanelElement(10));

    n4 = createFlicking("#needPanel-setMax", {
        infinite: true,
        autoResize: true,
        lastIndex: 51
    }).on({
        needPanel: function(e) {
            console.log("NEED_PANEL", e);
            var newPanel = e.fill(createPanelElement(0))[0];
            newPanel.update(el => el.innerHTML = "<p>Layer " + newPanel.getIndex() + "</p>");
        }
    });
    document.querySelector("#setLastIndex").addEventListener("click", function(e) {
        e.stopPropagation();
        var el = e.target;
        if(el.tagName != "BUTTON") { return; }

        var value = +el.querySelector("#lastIndex").value;

        console.log("SET LAST INDEX TO", value);
        n4.setLastIndex(value);
    });
    n4.resize();

    n5 = createFlicking("#needPanel-circular", {
        infinite: true,
        circular: true,
        autoResize: true,
        moveType: "freeScroll",
        lastIndex: 50,
        renderOnlyVisible: true
    }).on({
        needPanel: function(e) {
            console.log("NEED_PANEL", e);
            var newPanel = e.fill(createPanelElement(0))[0];
            newPanel.update(el => el.innerHTML = "<p>Layer " + newPanel.getIndex() + "</p>");
        }
    });
    n5.replace(0, createPanelElement(0));
}, 500);
