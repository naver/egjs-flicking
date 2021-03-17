var methodLog = function(element, v) {
    var elLog1 = document.querySelector("#log1");
    try {
        elLog1.innerHTML = element.innerHTML + " ==> " + JSON.stringify(v);
    } catch (e) {
        // Circular structure
        elLog1.innerHTML = element.innerHTML + " ==> " + v.toString();
    }
  }

  var logPanel = function(panel) {
    var elLog1 = document.querySelector("#log1");
    var panelInfo = "{\n";
    panelInfo += "  index: " + panel.getIndex() + ",\n";
    panelInfo += "  position: " + panel.getPosition() + ",\n";
    panelInfo += "  anchorPosition: " + panel.getAnchorPosition() + ",\n";
    panelInfo += "  relativeAnchorPosition: " + panel.getRelativeAnchorPosition() + ",\n";
    panelInfo += "  size: " + panel.getSize() + ",\n";
    panelInfo += "  isClone: " + panel.isClone() + ",\n";
    panelInfo += "  progress: " + panel.getProgress() + ",\n";
    panelInfo += "  outsetProgress: " + panel.getOutsetProgress() + ",\n";
    panelInfo += "  visibleRatio: " + panel.getVisibleRatio() + ",\n";
    panelInfo += "}";

    elLog1.innerHTML = "Panel " + panel.getIndex() + " ==> " + panelInfo;
  }

  var log = function(e) {
    console.log(e);
    var elLog2 = document.querySelector('#log2');
    if (log.end || !log.count) {
        elLog2.innerHTML = "";
        log.count = 1;
    }

    var msg = [ log.count++, e.type, e.direction, e.index ].join(" : ");

    elLog2.innerHTML = [ msg, elLog2.innerHTML, ""].join("<br>");
    log.end = /^(moveEnd)$/.test(e.type);
}

setTimeout(function() {
    document.body.style.display = "";

    // Events & Methods
    fe = createFlicking("#flick-event", {
        circular: true,
        moveType: "snap",
        autoResize: true
    }).on({
        holdStart: log,
        moveStart: log,
        move: log,
        holdEnd: log,
        change: log,
        restore: log,
        moveEnd: log,
        select: function(e) {
            e.panel.focus();
            log(e);
        }
    });
    var methods = new eg.Flicking("#methods", {
        circular: true,
        autoResize: true
    });

    var status;
    document.querySelector("#methods").addEventListener("click", function(e) {
        var el = e.target;
        var method = el.id;

        if(el.tagName != "BUTTON") { return; }

        if(/prev|next/.test(method)) {
            fe[method]();
        } else if(method === "moveTo") {
            fe[method](+document.querySelector('#moveTo_no').value);
        } else if (method === "getCurrentPanel") {
            logPanel(fe[method]());
        } else if (method === "getPanel") {
            logPanel(fe[method](+document.querySelector('#getPanel_no').value));
        } else if (method === "append") {
            var index = fe.getPanelCount();
            var elementToAdd = document.createElement("div");
            elementToAdd.classList.add("column", "is-one-fifth", 'has-background-' +  PANEL_COLORS[index % PANEL_COLORS.length])
            elementToAdd.innerHTML = '<p>Layer ' + index + '</p>';

            fe[method](elementToAdd);
            methodLog(el, 'Append index: ' + index + ', total: ' + fe.getPanelCount());
        } else if (method === "prepend") {
            var firstPanel = fe.getAllPanels()[0];
            var index = firstPanel && firstPanel.index > 0
                ? firstPanel.index - 1
                : 0;
            var elementToAdd = document.createElement("div");
            elementToAdd.classList.add("column", "is-one-fifth", 'has-background-' +  PANEL_COLORS[index % PANEL_COLORS.length])
            elementToAdd.innerHTML = '<p>Layer ' + index + '</p>';

            fe[method](elementToAdd);
            methodLog(el, 'Prepend index: ' + index + ', total: ' + fe.getPanelCount());
        } else if (method === "replace") {
            var index = +document.querySelector('#' + method + '_no').value;
            var elementToAdd = document.createElement("div");
            elementToAdd.classList.add("column", "is-one-fifth", 'has-background-' +  PANEL_COLORS[index % PANEL_COLORS.length])
            elementToAdd.innerHTML = '<p>Layer ' + index + '</p>';

            fe[method](index, elementToAdd);
            methodLog(el, 'Replace index: ' + index + ', total: ' + fe.getPanelCount());
        } else if (method === "remove") {
            var index = +document.querySelector("#remove_idx").value;
            var devareCnt = +document.querySelector("#remove_cnt").value;
            fe[method](index, devareCnt)
        } else if (method === "getStatus") {
            status = fe[method]();
            methodLog(el, status);
        } else if (method === "setStatus") {
            methodLog(el, fe[method](status));
        } else if (method === "destroy") {
            methodLog(el, fe[method]({ preserveStyle: true }))
        } else {
            methodLog(el, fe[method]());
        }
      });
  }, 500);
